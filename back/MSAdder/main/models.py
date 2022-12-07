from django.db import models

class Task(models.Model):
    title = models.TextField('URL')

    def __str__(self):
        return self.title