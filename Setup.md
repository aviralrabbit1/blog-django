### env Setup of Django

1. Make sure python and pip are installed on the system.
    ```sh
    python --version
    pip --version
    ```

2. Build a dedicated virtual environment for the Django project.
   ```sh
   python -m venv env
   ```

3. Activate the virutal environment(everytime when opening the project).
    ```sh
    source env/bin/activate
    ```

4. Install `DJango` inside this virtual environment.
   ```sh
   python -m pip install Django
   ```
   Check the django verion with
   ```sh
   django-admin --version
   ```

5. From the root directory, run 
    ```sh
    django-admin startproject core
    # rename the outer core folder
    mv core backend
    ```

6. Start an app inside `{root}/backend`
    ```sh
    cd backend
    python manage.py startapp BlogApp
    ```

7. In `backend/core/settings.py`, add dependencies(if any) and `BlogApp` (app name)
    ```py
    # backend/core/settings.py
    INSTALLED_APPS = [
    ...
    'BlogApp'
    ...
    ]
    ```
8. In `backend/core/urls.py`, add `BlogApp.urls` to urlpatterns
    ```py
    # backend/core/urls.py
    urlpatterns = [
        path('admin/', admin.site.urls),
        path('admin/', include('BlogApp.urls')),
    ]
    ```
9. To show "Hello World!", 
    - Create `backend/BlogApp/urls.py`
        ```py
        # backend/BlogApp/urls.py
        from django.urls import path
        from . import views

        urlpatterns = [
            path('', views.home, name='home'),
        ]    
        ```
    - In `backend/BlogApp/views.py`, add this
        ```py
        # backend/BlogApp/views.py
        from django.http import HttpResponse

        def home(request):
            return HttpResponse('Hello world')

        ```
        