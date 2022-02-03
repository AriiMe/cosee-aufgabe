from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Post
from base.serializers import PostSerializer


from rest_framework import status



@api_view(['GET'])
def getPosts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPost(request):
    user = request.user

    post = Post.objects.create(
        user = user,
        name='Sample Name',
        description=''
    )

    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updatePost(request, pk):
    data = request.data
    post = Post.objects.get(_id=pk)

    post.name = data['name']
    post.description = data['description']

    post.save()
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getPost(request, pk):
    post = Post.objects.get(_id=pk)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    post_id = data['post_id']
    post = Post.objects.get(_id=post_id)

    post.imgurl = request.FILES.get('imgurl')
    post.save()
    
    return Response('Image was uploaded')