from django.db import models
from django.contrib.auth.models import User
import os

from rest_framework.reverse import reverse as api_reverse

UPLOAD_ROOT = '/home/sc/static/'

class CustomUser(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)


class Industry(models.Model):
	industry_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=64)

	def __str__(self):
		return self.name


class Category(models.Model):
	category_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=64)
	industry = models.ForeignKey(Industry, on_delete=models.CASCADE, related_name="categories")

	def __str__(self):
		return "{} - {}".format(self.name, self.industry.name)


class MediaLocation(models.Model):
	medialocation_id = models.AutoField(primary_key=True)
	location_name = models.CharField(max_length=64)

	def __str__(self):
		return self.location_name


class Media(models.Model):
	media_id = models.AutoField(primary_key=True)
	file = models.FileField()
	title = models.CharField(max_length=64)
	description = models.CharField(max_length=128, blank=True, null=True)
	location = models.ForeignKey(MediaLocation, on_delete=models.CASCADE)


class SolutionMedia(models.Model):
	solutionmedia_id = models.AutoField(primary_key=True)
	pictures = models.ManyToManyField(Media)

	def __str__(self):
		return str(self.solutionmedia_id)


class TagType(models.Model):
	tagtype_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=64)

	def __str__(self):
		return self.name


class Tag(models.Model):
	tag_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=64)
	tagtype = models.ForeignKey(TagType, on_delete=models.CASCADE, related_name="tags")

	def __str__(self):
		return self.name


class Provider(models.Model):
	provider_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=64)
	email = models.EmailField()
	phone = models.CharField(max_length=10)
	address = models.CharField(max_length=128)
	city = models.CharField(max_length=128)
	state = models.CharField(max_length=2)
	zipcode = models.CharField(max_length=5)
	industry_type = models.CharField(max_length=64, blank=True, null=True)
	tagline = models.CharField(max_length=128)
	logo = models.ImageField()
	about_us = models.CharField(max_length=400)
	tags = models.ManyToManyField(Tag, related_name="providers")
	views = models.IntegerField(default=0)

	def __str__(self):
		return self.name

	@property
	def solution_views(self):
		total_views = 0
		if len(self.solutions.all()) > 0:
			for each in self.solutions.all():
				total_views += each.views
		return total_views

#Provider account
class ProviderAccount(models.Model):
	useraccount_id = models.AutoField(primary_key=True)
	user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="provider_account")
	provider = models.ForeignKey(Provider, on_delete=models.CASCADE,  related_name="provider_account")


class SeekerAccount(models.Model):
	seekeruser_id = models.AutoField(primary_key=True)
	user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="seeker_account")
	tags = models.ManyToManyField(Tag, blank=True, null=True)
	industries = models.ManyToManyField(Industry, blank=True, null=True)
	caregories = models.ManyToManyField(Category, blank=True, null=True)

	def __str__(self):
		return self.first + ' ' + self.last


class Solution(models.Model):
	solution_id = models.AutoField(primary_key=True)
	category = models.ManyToManyField(Category, blank=True, null=True, related_name='solutions')
	industry = models.ForeignKey(Industry, on_delete=models.CASCADE, blank=True, null=True, related_name='solutions')
	name = models.CharField(max_length=64)
	what = models.TextField()
	why = models.TextField()
	how = models.TextField()
	integration = models.TextField()
	opportunity = models.TextField()
	status = models.CharField(max_length=24, choices=[('Emerging soon','Emerging soon'), ('Available since', 'Available since')], blank=True, null=True)
	status_date = models.CharField(max_length=12, blank=True, null=True)
	tags = models.ManyToManyField(Tag, related_name='solutions')
	provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='solutions')
	views = models.IntegerField(default=0)

	def __str__(self):
		return self.name


class TeamMember(models.Model):
	teammember_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=64)
	title = models.CharField(max_length=64)
	description = models.CharField(max_length=256, blank=True, null=True)
	provider = models.ForeignKey(Provider, on_delete=models.CASCADE, blank=True, null=True, related_name='team_members')
	image = models.ImageField(upload_to="team_photos", blank=True, null=True)

	def __str__(self):
		return self.name
