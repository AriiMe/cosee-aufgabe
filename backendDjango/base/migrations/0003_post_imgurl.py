# Generated by Django 4.0.1 on 2022-01-31 19:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_alter_post_rating_saveditem_review'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='imgurl',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
