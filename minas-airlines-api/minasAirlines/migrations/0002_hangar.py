# Generated by Django 4.2.16 on 2024-11-27 00:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('minasAirlines', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hangar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=10, unique=True)),
                ('nome', models.CharField(max_length=100)),
                ('tipo', models.CharField(choices=[('P', 'Pequeno'), ('M', 'Médio'), ('G', 'Grande')], default='P', max_length=1)),
                ('capacidade_maxima', models.IntegerField(help_text='Capacidade máxima de aeronaves que o hangar pode comportar')),
                ('localizacao', models.CharField(help_text='Localização específica do hangar no aeroporto', max_length=255)),
            ],
        ),
    ]
