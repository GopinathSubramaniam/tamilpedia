from tamilpedia.app.models import Article
from tamilpedia.app.serializers import ArticleSerializer


class ArticleService:
    def __init__(self):
        print("init")

    def create(self, req):
        article = req.data
        data = Article.objects.create(**article)
        ser = ArticleSerializer(data)
        return ser.data

    def list(self):
        data = Article.objects.all()
        ser = ArticleSerializer(data, many=True)
        return ser.data
