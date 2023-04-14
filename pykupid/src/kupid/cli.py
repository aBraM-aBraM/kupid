import click
import uvicorn

from kupid import attractiveness_tester


@click.group
def main():
    pass


@main.command()
@click.argument("picture_path")
def picture(picture_path: str):
    """Evaluates attractiveness of a given picture"""
    with open(picture_path, 'rb') as picture_file_object:
        print(attractiveness_tester.load(picture_file_object))


@main.command()
@click.option("--host", type=str, default="localhost")
@click.option("--port", type=int, default=6969)
def serve(host: str, port: int):
    from kupid import simple_server
    uvicorn.run(simple_server.app, host=host, port=port)


if __name__ == '__main__':
    main()
