"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

import app.views as views
from app.views import home_page, requests_list, send_request, service_page, services_list_page
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'user', views.UserViewSet, basename='user')

urlpatterns = \
    [
        path('users/', include('auth_users.urls')),
        path('users/', include('django.contrib.auth.urls')),
        path('', home_page, name="home"),
        path('services/', services_list_page, name="service_select"),
        path('services/<int:id>/', service_page, name="service_info"),
        path('services/<int:id>/request', send_request, name="send_request"),
        path('requests/', requests_list, name="requests_list"),
        path('api/', include(router.urls)),
        path('api/service_requests/', views.ServiceRequestListAPIView.as_view()),
        path('api/service_requests/<int:pk>/', views.ServiceRequestAPIView.as_view()),
        path('api/service_requests/<int:pk>/form/', views.form_service_request),
        path('api/service_requests/<int:pk>/change_status/', views.change_status),
        path('api/specialists/', views.SpecialistListAPIView.as_view()),
        path('api/specialists/<int:pk>/', views.SpecialistAPIView.as_view()),
        path('api/specialists/<int:pk>/delete/', views.deleteSpecialistAPIView.as_view()),
        path('api/service_requests_specialists/', views.ServiceRequestSpecialistListAPIView.as_view()),
        path('api/service_requests_specialists/<int:pk>/', views.ServiceRequestSpecialistAPIView.as_view()),
        path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
        path('user/authentication/', views.login_view, name='login'),
        path('user/logout/', views.logout_view, name='logout'),
        path('api/async_task/', views.async_task_view, name='async_task'),
        path('api/update_async_result/', views.update_async_task_view, name='update_async_task'),
        path('api/moderator_rights_requests/', views.ModeratorRightsRequestsAPIView.as_view()),
        path('api/moderator_rights_requests/<int:pk>/approve/', views.approve_moderator_rights_request),
        path('api/moderator_rights_requests/<int:pk>/delete/', views.delete_moderator_rights_request),
    ] \
    + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
