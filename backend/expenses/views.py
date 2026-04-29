from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Expense
from .serializers import ExpenseSerializer
from django.db import IntegrityError
from django.db.models import Sum

@api_view(['GET', 'POST'])
def expenses_view(request):

    # =========================
    # ✅ GET: List expenses
    # =========================
    if request.method == 'GET':
        queryset = Expense.objects.all()

        # 🔍 Filter by category
        category = request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)

        # 📅 Sort by date (newest first)
        sort = request.query_params.get('sort')
        if sort == 'date_desc':
            queryset = queryset.order_by('-date')
        else:
            queryset = queryset.order_by('-created_at')  # default

        # 💰 Calculate total
        total = queryset.aggregate(total=Sum('amount'))['total'] or 0

        serializer = ExpenseSerializer(queryset, many=True)

        return Response({
            "total": total,
            "count": queryset.count(),
            "results": serializer.data
        })

    # =========================
    # 🔥 POST: Create expense (your existing logic)
    # =========================
    if request.method == 'POST':
        idempotency_key = request.headers.get('Idempotency-Key')

        if not idempotency_key:
            return Response(
                {"error": "Idempotency-Key header is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        existing = Expense.objects.filter(idempotency_key=idempotency_key).first()
        if existing:
            serializer = ExpenseSerializer(existing)
            return Response(serializer.data, status=status.HTTP_200_OK)

        data = request.data.copy()
        data['idempotency_key'] = idempotency_key

        serializer = ExpenseSerializer(data=data)
        if serializer.is_valid():
            try:
                expense = serializer.save()
                return Response(
                    ExpenseSerializer(expense).data,
                    status=status.HTTP_201_CREATED
                )
            except IntegrityError:
                existing = Expense.objects.get(idempotency_key=idempotency_key)
                return Response(
                    ExpenseSerializer(existing).data,
                    status=status.HTTP_200_OK
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)