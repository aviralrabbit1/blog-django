from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('category/', views.category, name='category'),
    path('users/', views.users, name='users'),
    path('register/', views.user_registration, name='user-register'),
]
