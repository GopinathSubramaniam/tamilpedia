from tamilpedia.app.models import Tag
from tamilpedia.app.serializers import TagSerializer


class TagService:
    def __init__(self):
        print("init")

    def create(self, req):
        tag = req.data
        data = Tag.objects.create(**tag)
        ser = TagSerializer(data)
        return ser.data

    def list(self):
        data = Tag.objects.all()
        ser = TagSerializer(data, many=True)
        return ser.data
