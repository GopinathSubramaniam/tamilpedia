from django.conf.urls import url, include
from rest_framework import routers
from .views import UserView, CategoryView

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

urlpatterns = [
    url('user/', include(userUrls)),
    url('category/', include(categoryUrls))
]
