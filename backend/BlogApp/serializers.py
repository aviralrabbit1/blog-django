from rest_framework import serializers # for simplifying model serialization.
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
