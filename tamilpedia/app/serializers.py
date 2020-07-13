import logging

from rest_framework import serializers

from tamilpedia.app.models import User, Login, Category, Article

logger = logging.getLogger(__name__)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def list(self):
        data = User.objects.all()
        ser = UserSerializer(data, many=True)
        return ser.data


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ['id', 'username', 'email', 'token', 'userType', 'user']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'is_active', 'has_child', 'path', 'parent_category_id']


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

