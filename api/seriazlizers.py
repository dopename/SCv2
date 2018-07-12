from rest_framework import serializers
from main.models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
	username = serializers.CharField(source='user.username', read_only=True)

	class Meta:
		model = CustomUser
		fields = [
			'pk',
			'username'
		]