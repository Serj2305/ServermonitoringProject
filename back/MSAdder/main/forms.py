from .models import Task
from django.forms import ModelForm, TextInput


class TaskForm(ModelForm):
    class Meta:
        model = Task
        fields = ["title"]
        widgets = {"title" : TextInput(
            attrs={'class' : 'form-control',
                'placeholder' : 'введите url'})
        }