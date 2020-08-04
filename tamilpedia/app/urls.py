from django.conf.urls import url, include
from rest_framework import routers
from .views import UserView, CategoryView, ArticleView

# User URL's
userUrls = [
    url('list/', UserView.list),
    url('create/', UserView.create),
]

# Category URL's
categoryUrls = [
    # url('list/', CategoryView.list),
    url('create', CategoryView.create),
    url('tree', CategoryView.tree),
    url('all', CategoryView.all)
]

# Article URL's
articleUrls = [
    url('create', ArticleView.create),
    url('all', ArticleView.get),
]

urlpatterns = [
    url('user/', include(userUrls)),
    url('category/', include(categoryUrls)),
    url('article/', include(articleUrls))
]
