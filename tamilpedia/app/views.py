import logging

from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from tamilpedia.app.services.article_service import ArticleService
from tamilpedia.app.services.category_service import CategoryService
from tamilpedia.app.services.user_service import UserService
from tamilpedia.app.util import Util

logger = logging.getLogger(__name__)


# Create your views here.
class UserView(APIView):

    @api_view(['GET'])
    def list(self):
        data = UserService.list(self)
        res = Util.get_res(data)
        return JsonResponse(res, safe=False)

    @api_view(['POST'])
    def create(self, req):
        data = UserService.create(req)
        res = Util.get_res(data)
        return JsonResponse(res, safe=False)


class CategoryView(APIView):

    @api_view(['GET'])
    def all(self):
        cat_service = CategoryService()
        category_tree = cat_service.get_all_categories()
        categories = list(cat_service.get_all())
        json_data = {'tree': category_tree, 'cats': categories}
        res = Util.get_res(json_data)
        return JsonResponse(res, safe=False)

    @api_view(['GET'])
    def tree(self):
        category_tree = CategoryService().get_all_categories()
        res = Util.get_res(category_tree)
        return JsonResponse(res, safe=False)

    @api_view(['POST'])
    def create(self):
        data = CategoryService().create(self)
        res = Util.get_res(data)
        return JsonResponse(res, safe=False)


class ArticleView(APIView):

    @api_view(['POST'])
    def create(self, req):
        data = ArticleService().create(self)
        res = Util.get_res(data)
        return JsonResponse(res, safe=False)

    @api_view(['GET'])
    def get(self):
        category_tree = ArticleService().list()
        res = Util.get_res(category_tree)
        return JsonResponse(res, safe=False)
