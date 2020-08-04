from django.contrib.auth.models import User

from tamilpedia.app.serializers import UserSerializer


class UserService:
    def __init__(self):
        print("init")

    def create(self, req):
        user = req.data
        existing_user = User.objects.get(email=user.email)
        if existing_user is None:
            data = User.objects.create_user(**user)
            ser = UserSerializer(data)
            return ser.data

        return user

    def list(self):
        data = User.objects.all()
        ser = UserSerializer(data, many=True)
        return ser.data
