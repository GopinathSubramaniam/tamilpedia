from django.db import models


# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    mobile = models.CharField(max_length=12)
    phone_number = models.CharField(max_length=12, null=True)
    address = models.CharField(max_length=255)
    profile_img_path = models.CharField(max_length=255)

    def __unicode__(self):
        return '__all__'


class Login(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, null=None)
    email = models.CharField(max_length=50, null=None)
    password = models.CharField(max_length=50, null=None)
    token = models.CharField(max_length=255, null=None)
    user_type = models.CharField(max_length=50, null=None)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __unicode__(self):
        return '__all__'


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, null=None)
    is_active = models.CharField(max_length=2, null=None, default='Y')
    has_child = models.CharField(max_length=2, null=None, default='N')
    path = models.CharField(max_length=255, null=None)
    parent_category_id = models.BigIntegerField(null=True)

    def __unicode__(self):
        return '__all__'


class Article(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=150, null=None)
    keywords = models.CharField(max_length=255, null=None)
    content_preview = models.CharField(max_length=255, null=None)
    content = models.TextField(max_length=2000, null=None)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __unicode__(self):
        return '__all__'


class App(models.Model):
    STATUS = 'OK'

