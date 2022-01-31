from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Post
from .posts import posts
from .serializers import PostSerializer

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/posts/',
        'api/posts/create/',
        'api/posts/upload/',
        'api/posts/<id>/reviews/',

        'api/posts/top/',
        'api/posts/<id>/',

        'api/posts/delete/<id>/',
        'api/posts/<update>/<id>/',
    ]
    return Response(routes)

@api_view(['GET'])
def getPosts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getPost(request, pk):
    post = Post.objects.get(_id=pk)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)