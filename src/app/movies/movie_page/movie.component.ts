import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';

const INITIAL_MOVIE_ID = 1
const ITEMS_PER_PAGE = 25
@Component({
    selector: 'movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss']
})
export class MovieComponent  implements OnInit {
    private currentMovieId: number;
    private backgroundUrl: string;
    private movie: any;

    constructor(private movieService: MovieService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.currentMovieId = parseInt(params['movieId']);
            this.movieService.getMovieWithIdCached(this.currentMovieId).subscribe((_response: any) => {
                console.log(_response);
                this.movie = _response;
                this.backgroundUrl = _response.coverImage;
            });
        })
    }

}