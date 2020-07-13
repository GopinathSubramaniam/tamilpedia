import logging

from tamilpedia.app.models import Category
from tamilpedia.app.serializers import CategorySerializer

logger = logging.getLogger(__name__)


class CategoryService:

    def __init__(self):
        print("init")  # never prints

    def create(self, req):
        cat = req.data
        cat_name = cat['name']
        # START Checking category whether it is exists or not
        try:
            existing_obj = Category.objects.get(name__exact=cat_name)
        except Category.DoesNotExist:
            existing_obj = None
        # END

        # START Create new category only, If the category is not available
        if existing_obj is None:
            path = cat_name
            parent_cat_id = cat.get('parent_category_id')
            if parent_cat_id and parent_cat_id is not None and parent_cat_id > 0:
                logger.debug("Parent Category Exists")
                parent = Category.objects.get(id=parent_cat_id)
                parent.has_child = 'Y'
                parent.save()
                path = parent.path + '->' + cat_name

            cat['path'] = path
            logger.debug(cat)
            data = Category.objects.create(**cat)
            ser = CategorySerializer(data)
            cat = ser.data

        return cat
        # END

    # Get all categories without child categories
    def get_all(self):
        categories = Category.objects.values()
        return categories

    # END

    # START - Get all parent and child categories
    def get_all_categories(self):
        category_tree = []
        categories = Category.objects.values()
        parents = self.get_parents(categories)
        for parent in parents:
            child_cats = self.get_childs(parent, categories)
            if child_cats is not None:
                parent['childs'] = child_cats
                parent['count'] = len(child_cats)
            category_tree.append(parent)

        return category_tree

    # END

    # START - Get only parents categories
    def get_parents(self, categories):
        parents = []
        for category in categories:
            if category is not None and category['parent_category_id'] is None:
                parents.append(category)
        return parents

    # END

    # START - Get all child categories and it's childs
    def get_childs(self, parent, categories):
        childs = []
        for category in categories:
            if parent['id'] == category['parent_category_id']:
                child_cats = self.get_childs(category, categories)
                if child_cats is not None:
                    category['childs'] = child_cats
                    category['count'] = len(child_cats)

                childs.append(category)
        return childs
    # END
