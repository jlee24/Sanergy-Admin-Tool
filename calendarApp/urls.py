from django.views.generic import TemplateView
from django.conf.urls import include, url

from . import views

urlpatterns = [
    #url(r'^$', views.index, name='index'),
    url(r'^$', TemplateView.as_view(template_name="homepage.html"),),
    url(r'^fullcalendar/', TemplateView.as_view(template_name="fullcalendar.html"), name='fullcalendar'),
    url(r'^schedule/', include('schedule.urls')),
]
