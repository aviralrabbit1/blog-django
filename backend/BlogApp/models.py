from django.db import models
from django.contrib.auth.models import User

# Category model that represents the categories for the posts. 
# This allows to associate posts with different categories.
class Category(models.Model):
    name = models.CharField(max_length=100)

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    image_url = models.URLField()
    date_posted = models.DateTimeField(auto_now_add=True)
    
    # owner field is a foreign key to the Django's built-in User model, 
    # representing the owner of the post.
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    # The category field is a foreign key to the Category model, 
    # allowing you to categorize your posts.
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    # __str__ method of the Post model represents the model instances as strings 
    # (e.g., when viewing them in the Django admin panel).
    # def __str__(self):
    #     return self.title
    def custom_object(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'image_url': self.image_url,
            'date_posted': self.date_posted,
            'owner': self.owner.username,  # Example: Get the owner's username
            'category': self.category.name  # Example: Get the category's name
        }
