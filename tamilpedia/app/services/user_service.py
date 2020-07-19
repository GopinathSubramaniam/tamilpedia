from tamilpedia.app.models import User
from tamilpedia.app.serializers import UserSerializer


class UserService:
    def __init__(self):
        print("init")

    def create(self, req):
        article = req.data
        data = User.objects.create(**article)
        ser = UserSerializer(data)
        return ser.data

    def list(self):
        data = User.objects.all()
        ser = UserSerializer(data, many=True)
        return ser.data
