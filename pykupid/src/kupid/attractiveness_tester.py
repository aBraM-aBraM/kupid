from typing import BinaryIO

import requests
import io
import base64

import PIL.Image
import bs4


HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0'
}


def load(picture_file_object: BinaryIO) -> float:
    """
    :return attractiveness from picture data
    :param picture_file_object - file_object containing picture data
    :raises ValueError - could not get attractiveness value
    """
    image_format = PIL.Image.open(picture_file_object).format
    picture_file_object.seek(0)
    file_data = io.StringIO(f'data:image/{image_format};base64,{base64.b64encode(picture_file_object.read()).decode()}')

    response = requests.post('https://attractivenesstest.com/result',
                             files={'image_data': (None, file_data)},
                             headers=HEADERS)

    response_soup = bs4.BeautifulSoup(response.text, "html.parser")
    rank_divs = response_soup.find_all("div", {"class": "skill html"})

    try:
        return float(rank_divs[0].text.split()[1])
    except IndexError:
        raise ValueError
