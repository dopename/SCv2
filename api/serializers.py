from rest_framework import serializers
from main.models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class MultipartM2MField(serializers.Field):
	def to_representation(self, obj):
		return obj.values_list('pk', flat=True).order_by('pk')

	def to_internal_value(self, data):
		return data.split(',') if data else None


class LoginUserSerializer(serializers.Serializer):
	username = serializers.CharField()
	password = serializers.CharField()

	def validate(self, data):
		user = authenticate(**data)
		if user and user.is_active:
			return user
		raise serializers.ValidationError("Unable to log in with provided credentials.")


class CreateUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'email', 'password')
		extra_kwargs = {'password': {'write_only': True}}

	def create(self, validated_data):
		user = User.objects.create_user(validated_data['username'],
										None,
										validated_data['password'])
		return user

class CustomCreateUserSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField(write_only=True)
	first_name = serializers.CharField()
	last_name = serializers.CharField()
	phone_number = serializers.CharField()


class UserLoginSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ['username', 'pk']
		

class CustomUserSerializer(serializers.ModelSerializer):
	seeker_account = serializers.PrimaryKeyRelatedField(read_only=True)
	provider_account = serializers.PrimaryKeyRelatedField(read_only=True)

	class Meta:
		model = CustomUser
		fields = [
			'pk',
			'seeker_account',
			'provider_account'
		]


class UserSerializer(serializers.ModelSerializer):
	custom_user = CustomUserSerializer()

	class Meta:
		model = User
		fields = ('id', 'username', 'custom_user')

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
			"provider_account",
			"child_tags",
			"solution_views",
			"child_ind_cat",
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

#/------------------------------------------------------------------------------/

class SeekerAccountCreateSerializer(serializers.ModelSerializer):

	class Meta:
		model = SeekerAccount
		fields = [
			"user",
			"tags",
			#"industries",
			"categories"
		]

class SeekerAccountUpdateSerializer(serializers.ModelSerializer):
	bookmarks = serializers.PrimaryKeyRelatedField(many=True, required=False, queryset=Solution.objects.all())
	tags = serializers.PrimaryKeyRelatedField(many=True, required=False, queryset=Tag.objects.all())
	categories = serializers.PrimaryKeyRelatedField(many=True, required=False, queryset=Category.objects.all())

	class Meta:
		model = SeekerAccount
		fields = [
			"tags",
			"categories",
			"bookmarks"
		]


#/------------------------------------------------------------------------------/


class SolutionCreateSerializer(serializers.ModelSerializer):
	tags = MultipartM2MField()

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
			"main_image"
		]


class SolutionSerializer(serializers.ModelSerializer):
	provider_name = serializers.CharField(source='provider.name', read_only=True)
	provider_logo = serializers.ImageField(source='provider.logo', read_only=True)
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
			"provider_logo",
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


class SolutionNameSerializer(serializers.ModelSerializer):
	
	class Meta:
		model = Solution
		fields = [
			"pk",
			"name",
		]	
		


class SeekerAccountSerializer(serializers.ModelSerializer):
	bookmarks = SolutionNameSerializer(many=True, read_only=True)
	categories = CategorySerializer(many=True, read_only=True)
	tags = SolutionTagSerializer(many=True, read_only=True)

	class Meta:
		model = SeekerAccount
		fields = [
			"pk",
			"tags",
			"categories",
			"bookmarks"
		]

class ProviderAccountSolutionSerializer(serializers.ModelSerializer):
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
			"bookmark_count",
		]

class ProviderAccountProviderSerializer(serializers.ModelSerializer):
	solutions = ProviderAccountSolutionSerializer(read_only=True, many=True)

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
			"child_tags",
			"solution_views",
		]

class ProviderAccountSerializer(serializers.ModelSerializer):
	provider = ProviderAccountProviderSerializer(read_only=True)

	class Meta:
		model = ProviderAccount
		fields = [
			"pk",
			"user",
			"provider",
		]

class CustomUserSerializer(serializers.ModelSerializer):
	seeker_account = SeekerAccountSerializer()
	provider_account = ProviderAccountSerializer()

	class Meta:
		model = CustomUser
		fields = [
			'pk',
			'seeker_account',
			'provider_account'
		]


class UserSerializer(serializers.ModelSerializer):
	custom_user = CustomUserSerializer()

	class Meta:
		model = User
		fields = ('id', 'username', 'custom_user')