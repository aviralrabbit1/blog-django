from rest_framework import serializers # for simplifying model serialization.
from django.contrib.auth.models import User
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta: 
        model = Category
        fields = "__all__"
        #include all fields from the respective model in the serialized output.
        
class PostSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Post
        fields = "__all__"
        
class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = "__all__"
        
# custom serializer for user registration
class UserRegSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=200)
    password = serializers.CharField(max_length=100, write_only=True)
    # write-only means the password won't be included in serialized responses.
    
    def create(self, validated_data): # create method overridden to handle user creation
        user = User.objects.create(
            username = validated_data['username'],
            password = validated_data['password']
        )
        # When data is validated and the create method is called, it creates a new User instance 
        # using the provided username and password, and then returns the created user.
        
        return user
