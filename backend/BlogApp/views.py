from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from django.contrib.auth.models import User

# Create your views here.

@api_view(['GET'])
def home(request):
    posts = Post.objects.all()
    serialize = PostSerializer(posts, many = True)
    return HttpResponse(serialize.data)
