# Generated by Django 3.0.3 on 2020-07-10 13:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, null=None)),
                ('isActive', models.CharField(default='Y', max_length=2, null=None)),
                ('hasChild', models.CharField(max_length=2, null=None)),
                ('path', models.CharField(max_length=255, null=None)),
                ('parentCategoryId', models.BigIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('mobile', models.CharField(max_length=12)),
                ('phoneNumber', models.CharField(max_length=12)),
                ('address', models.CharField(max_length=255)),
                ('profileImgPath', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name': 'User',
                'verbose_name_plural': 'Users',
            },
        ),
        migrations.CreateModel(
            name='Login',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=50, null=None)),
                ('email', models.CharField(max_length=50, null=None)),
                ('password', models.CharField(max_length=50, null=None)),
                ('token', models.CharField(max_length=255, null=None)),
                ('userType', models.CharField(max_length=50, null=None)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.User')),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=150, null=None)),
                ('keywords', models.CharField(max_length=255, null=None)),
                ('contentPreview', models.CharField(max_length=255, null=None)),
                ('content', models.TextField(max_length=2000, null=None)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.User')),
            ],
        ),
    ]