import logging

from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from tamilpedia.app.serializers import UserSerializer
from tamilpedia.app.services.category_service import CategoryService
from tamilpedia.app.util import Util

logger = logging.getLogger(__name__)


# Create your views here.
class UserView(APIView):

    @api_view(['GET'])
    def list(self):
        data = UserSerializer.list(self)
        return JsonResponse(data, safe=False)

    @api_view(['POST'])
    def create(self):
        return JsonResponse("POST")


class CategoryView(APIView):

    @api_view(['GET'])
    def all(self):
        cat_service = CategoryService()
        category_tree = cat_service.get_all_categories()
        logger.debug(category_tree)
        categories = list(cat_service.get_all())
        logger.debug(categories)
        json_data = {'tree': category_tree, 'cats': categories}
        res = Util.get_res(json_data)
        return JsonResponse(res, safe=False)

    @api_view(['GET'])
    def tree(self):
        category_tree = CategoryService().get_all_categories()
        res = Util.get_res(category_tree);
        return JsonResponse(res, safe=False)

    @api_view(['POST'])
    def create(self):
        data = CategoryService().create(self);
        res = Util.get_res(data);
        return JsonResponse(res, safe=False)
