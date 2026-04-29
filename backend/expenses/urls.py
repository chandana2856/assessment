from django.urls import path
from .views import expenses_view

urlpatterns = [
    path('expenses', expenses_view),
]