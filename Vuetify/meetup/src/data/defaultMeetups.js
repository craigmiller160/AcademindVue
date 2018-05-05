import * as dateUtil from '@/util/Date';

export default [
    {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: '1',
        title: 'Meetup in New York',
        date: dateUtil.createDate('2017-07-17', '17:00'),
        location: 'New York',
        description: 'Hanging out in NYC'
    },
    {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
        id: '2',
        title: 'Meetup in Paris',
        date: dateUtil.createDate('2017-07-19', '19:00'),
        location: 'Paris',
        description: 'Chillin in Paris'
    }
]
