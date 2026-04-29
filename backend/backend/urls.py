from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),   # 👈 THIS LINE IS MISSING
    path('', include('expenses.urls')),
]