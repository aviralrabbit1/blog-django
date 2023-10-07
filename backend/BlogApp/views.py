from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from django.contrib.auth.models import User

# Create your views here.

@api_view(['GET']) # decorator provided by the Django REST framework
def home(request):
    # takes a single argument, request, which is the HTTP request made by the client.
    posts = Post.objects.all() # queries the database to retrieve all Post objects. 
    serialize = PostSerializer(posts, many = True) # creates a serializer instance called serialize 
    # by passing the Post objects (posts) to the PostSerializer. 
    # many=True argument indicates serializing a queryset with multiple objects.
    return HttpResponse(serialize.data) 
    # returns an HTTP response containing the serialized data as the response content

@api_view(['GET'])
def category(request):
    categories = Category.objects.all()
    serialize = CategorySerializer(categories, many = True)
    return HttpResponse(serialize.data)

@api_view(['GET'])
def users(request):
    user = User.objects.all()
    serialize = UserSerializer(user, many = True)
    return HttpResponse(serialize.data)
