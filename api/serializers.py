from rest_framework import serializers
from main.models import *
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
	username = serializers.CharField(source='user.username', read_only=True)
	seeker_account = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	provider_acount = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

	class Meta:
		model = CustomUser
		fields = [
			'pk',
			'username',
			'seeker_user',
			'provider_user'
		]


class UserLoginSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ['username', 'pk']

#/------------------------------------------------------------------------------/

class CategoryCreateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Category
		fields = [
			"name",
			"industry"
		]


class CategorySerializer(serializers.ModelSerializer):
	solutions = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

	class Meta:
		model = Category
		fields = [
			"pk",
			"name",
			"industry",
			"solutions"
		]

class CategoryDestroySerializer(serializers.ModelSerializer):

	class Meta:
		model = Category
		fields = [
			"pk"
		]

#/------------------------------------------------------------------------------/

class IndustryCreateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Industry
		fields = [
			"name"
		]


class IndustrySerializer(serializers.ModelSerializer):
	solutions = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	categories = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

	class Meta:
		model = Industry
		fields = [
			"pk",
			"name",
			"solutions",
			"categories"
		]

class IndustryListSerializer(serializers.ModelSerializer):
	categories = CategorySerializer(many=True, read_only=True)

	class Meta:
		model = Industry
		fields = [
			"pk",
			"name",
			"categories"
		]

class IndustryDestroySerializer(serializers.ModelSerializer):

	class Meta:
		model = Industry
		fields = [
			"pk",
		]

#/------------------------------------------------------------------------------/

class MediaLocationCreateSerializer(serializers.ModelSerializer):

	class Meta:
		model = MediaLocation
		fields = [
			"location_name"
		]


class MediaLocationSerializer(serializers.ModelSerializer):

	class Meta:
		model = MediaLocation
		fields = [
			"pk",
			"location_name"
		]

class MediaLocationDestroySerializer(serializers.ModelSerializer):

	class Meta:
		model = MediaLocation
		fields = [
			"pk"
		]

#/------------------------------------------------------------------------------/


class MediaCreateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Media
		fields = [
			"file",
			"title",
			"description",
			"location"
		]


class MediaSerializer(serializers.ModelSerializer):

	class Meta:
		model = Media
		fields = [
			"pk",
			"file",
			"title",
			"description",
			"location"
		]

class MediaDestroySerializer(serializers.ModelSerializer):

	class Meta:
		model = Media
		fields = [
			"pk"
		]

#/------------------------------------------------------------------------------/


class SolutionMediaCreateSerializer(serializers.ModelSerializer):

	class Meta:
		model = SolutionMedia
		fields = [
			"pictures"
		]


class SolutionMediaSerializer(serializers.ModelSerializer):

	class Meta:
		model = SolutionMedia
		fields = [
			"pk",
			"pictures"
		]

class SolutionMediaDestroySerializer(serializers.ModelSerializer):

	class Meta:
		model = SolutionMedia
		fields = [
			"pk"
		]


#/------------------------------------------------------------------------------/


class TagTypeCreateSerializer(serializers.ModelSerializer):

	class Meta:
		model = TagType
		fields = [
			"name"
		]


class TagTypeSerializer(serializers.ModelSerializer):

	class Meta:
		model = TagType
		fields = [
			"pk",
			"name"
		]

class TagTypeDestroySerializer(serializers.ModelSerializer):

	class Meta:
		model = TagType
		fields = [
			"pk"
		]

#/------------------------------------------------------------------------------/


class TagCreateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Tag
		fields = [
			"name",
			"tagtype"
		]


class TagSerializer(serializers.ModelSerializer):
	providers = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

	class Meta:
		model = Tag
		fields = [
			"pk",
			"name",
			"tagtype",
			"providers"
		]

class SolutionTagSerializer(serializers.ModelSerializer):

	class Meta:
		model = Tag
		fields = [
			"pk",
			"name"
		]

class TagDestroySerializer(serializers.ModelSerializer):

	class Meta:
		model = Tag
		fields = [
			"pk"
		]

#/------------------------------------------------------------------------------/

class ProviderCreateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Provider
		fields = [
			"name",
			"email",
			"phone", 
			"address",
			"city",
			"state",
			"zipcode",
			"industry_type",
			"tagline",
			"logo",
			"about_us",
			"tags",
			"views"
		]


class ProviderSerializer(serializers.ModelSerializer):
	solutions = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	provider_account = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

	class Meta:
		model = Provider
		fields = [
			"pk",
			"name",
			"email",
			"phone", 
			"address",
			"city",
			"state",
			"zipcode",
			"industry_type",
			"tagline",
			"logo",
			"about_us",
			"tags",
			"views",
			"solutions",
			"provider_account"
		]

class ProviderDestroySerializer(serializers.ModelSerializer):

	class Meta:
		model = Provider
		fields = [
			"pk"
		]


class ProviderUpdateViewsSerializer(serializers.ModelSerializer):

	class Meta:
		model = Provider
		fields = [
			"pk",
			"views"
		]

#/------------------------------------------------------------------------------/

class ProviderAccountCreateSerializer(serializers.ModelSerializer):

	class Meta:
		model = ProviderAccount
		fields = [
			"user",
			"provider"
		]


class ProviderAccountSerializer(serializers.ModelSerializer):

	class Meta:
		model = ProviderAccount
		fields = [
			"pk",
			"user",
			"provider"
		]

#/------------------------------------------------------------------------------/

class SeekerAccountCreateSerializer(serializers.ModelSerializer):

	class Meta:
		model = SeekerAccount
		fields = [
			"user",
			"tags",
			"industries",
			"categories"
		]


class SeekerAccountSerializer(serializers.ModelSerializer):

	class Meta:
		model = SeekerAccount
		fields = [
			"pk",
			"user",
			"tags",
			"industries",
			"categories"
		]


#/------------------------------------------------------------------------------/


class SolutionCreateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Solution
		fields = [
			"category",
			"industry",
			"name", 
			"what",
			"why",
			"how",
			"integration",
			"opportunity",
			"status",
			"status_date",
			"tags",
			"provider",
			"views",
			"main_image"
		]


class SolutionSerializer(serializers.ModelSerializer):
	provider_name = serializers.CharField(source='provider.name', read_only=True)
	tags = SolutionTagSerializer(many=True, read_only=True)

	class Meta:
		model = Solution
		fields = [
			"pk",
			"category",
			"industry",
			"name", 
			"what",
			"why",
			"how",
			"integration",
			"opportunity",
			"status",
			"status_date",
			"tags",
			"provider",
			"views",
			"main_image",
			"solutionmedia",
			"provider_name",
		]

class SolutionDestroySerializer(serializers.ModelSerializer):

	class Meta:
		model = Solution
		fields = [
			"pk"
		]


class SolutionUpdateViewsSerializer(serializers.ModelSerializer):

	class Meta:
		model = Solution
		fields = [
			"pk",
			"views"
		]		
		
