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
