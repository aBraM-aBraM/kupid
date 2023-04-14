import click

from src import attractiveness_tester


@click.group
def main():
    pass


@main.command()
@click.argument("picture_path")
def picture(picture_path: str):
    """Evaluates attractiveness of a given picture"""
    with open(picture_path, 'rb') as picture_file_object:
        print(attractiveness_tester.load(picture_file_object))


if __name__ == '__main__':
    main()
