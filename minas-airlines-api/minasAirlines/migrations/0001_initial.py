# Generated by Django 4.2.16 on 2024-11-27 00:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Airplane',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('matricula', models.CharField(max_length=5)),
                ('numero_Voo', models.CharField(max_length=4)),
                ('modelo', models.CharField(max_length=4)),
                ('procedencia', models.CharField(max_length=3)),
                ('destino', models.CharField(max_length=3)),
                ('numero_passageiros', models.IntegerField(null=True)),
            ],
        ),
    ]
