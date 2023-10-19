from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from django.contrib.auth.models import User
import json 

# Create your views here.

@api_view(['GET']) # decorator provided by the Django REST framework
def home(request):
    # takes a single argument, request, which is the HTTP request made by the client.
    posts = Post.objects.all() # queries the database to retrieve all Post objects. 
    serialize = PostSerializer(posts, many = True) # creates a serializer instance called serialize 
    # by passing the Post objects (posts) to the PostSerializer. 
    # many=True argument indicates serializing a queryset with multiple objects.
    return HttpResponse(json.dumps(serialize.data)) 
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

@api_view(['POST'])
def user_registration(request):
    serializer = UserRegSerializer(data=request.data)
    # serializer UserRegSerializer is initialized with the data from the HTTP request 
    if serializer.is_valid(): # checks if the data provided in the request is valid 
                              # according to the rules defined in the UserRegSerializer
        user = serializer.save() # If the data is valid, save the data to create a new user in the database
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def postdetails(request, pk):
    id = request.GET.get('id', None)
    post = Post.objects.get(pk=pk)
    serialize = PostSerializer(post)
    return HttpResponse(json.dumps(serialize.data))
    
