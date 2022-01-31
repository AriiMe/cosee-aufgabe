from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .posts import posts

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
    return Response(posts)

@api_view(['GET'])
def getPost(request, pk):
    post = None
    for i in posts:
        if i['_id'] == pk:
            post = i
            break

    return Response(post)