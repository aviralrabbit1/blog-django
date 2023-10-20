from django.urls import path
from . import views

urlpatterns = [
    path('blog', views.home, name='home'),
    path('blog/<str:id>', views.postdetails, name='post-details'),
    path('category/', views.category, name='category'),
    path('users/', views.users, name='users'),
    path('register/', views.user_registration, name='user-register'),
]
