package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

type TMDBCreditsResponse struct {
	ID   int `json:"id"`
	Cast []struct {
		Adult              bool    `json:"adult"`
		Gender             int     `json:"gender"`
		ID                 int     `json:"id"`
		KnownForDepartment string  `json:"known_for_department"`
		Name               string  `json:"name"`
		OriginalName       string  `json:"original_name"`
		Popularity         float64 `json:"popularity"`
		ProfilePath        string  `json:"profile_path"`
		CastID             int     `json:"cast_id"`
		Character          string  `json:"character"`
		CreditID           string  `json:"credit_id"`
		Order              int     `json:"order"`
	} `json:"cast"`
	Crew []struct {
		Adult              bool    `json:"adult"`
		Gender             int     `json:"gender"`
		ID                 int     `json:"id"`
		KnownForDepartment string  `json:"known_for_department"`
		Name               string  `json:"name"`
		OriginalName       string  `json:"original_name"`
		Popularity         float64 `json:"popularity"`
		ProfilePath        string  `json:"profile_path"`
		CreditID           string  `json:"credit_id"`
		Department         string  `json:"department"`
		Job                string  `json:"job"`
	} `json:"crew"`
}

type Actor struct {
	ID          int          `json:"id"`
	MovieCount  int          `json:"movie_count"`
	MovieOrders []MovieOrder `json:"movie_orders"`
	Name        string       `json:"name"`
	Popularity  float64      `json:"popularity"`
	ProfilePath string       `json:"profile_path"`
}

type Director struct {
	ID          int     `json:"id"`
	MovieCount  int     `json:"movie_count"`
	Name        string  `json:"name"`
	Popularity  float64 `json:"popularity"`
	ProfilePath string  `json:"profile_path"`
}

type MovieOrder struct {
	ID    int `json:"id"`
	Order int `json:"order"`
}

func main() {
	jsonFile, err := os.Open("credits.json")
	if err != nil {
		fmt.Println(err)
	}
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var movies []TMDBCreditsResponse
	json.Unmarshal([]byte(byteValue), &movies)

	actors := make(map[int]Actor)
	directors := make(map[int]Director)
	for _, movie := range movies {
		for _, cast := range movie.Cast {
			movieOrder := MovieOrder{
				ID:    movie.ID,
				Order: cast.Order,
			}
			actor, exist := actors[cast.ID]
			if exist {
				actor.MovieOrders = append(actor.MovieOrders, movieOrder)
				actor.MovieCount = len(actor.MovieOrders)
				actors[cast.ID] = actor
			} else {
				actors[cast.ID] = Actor{
					ID:          cast.ID,
					MovieCount:  1,
					MovieOrders: []MovieOrder{movieOrder},
					Name:        cast.Name,
					Popularity:  cast.Popularity,
					ProfilePath: cast.ProfilePath,
				}
			}
		}
		for _, crew := range movie.Crew {
			director, exist := directors[crew.ID]
			if exist {
				director.MovieCount++
				directors[crew.ID] = director
			} else {
				directors[crew.ID] = Director{
					ID:          crew.ID,
					MovieCount:  1,
					Name:        crew.Name,
					Popularity:  crew.Popularity,
					ProfilePath: crew.ProfilePath,
				}
			}
		}
	}

	popularActors := make(map[int]Actor)
	for _, a := range actors {
		if a.Popularity > 9.0 || a.MovieCount > 9 {
			popularActors[a.ID] = a
			continue
		}
		for _, m := range a.MovieOrders {
			if m.Order == 0 {
				popularActors[a.ID] = a
				continue
			}
		}
	}

	popularDirectors := make(map[int]Director)
	for _, d := range directors {
		if d.Popularity > 9.0 || d.MovieCount > 9 {
			popularDirectors[d.ID] = d
			continue
		}
	}

	actorMostMovies := Actor{}
	for _, pa := range popularActors {
		if pa.MovieCount > actorMostMovies.MovieCount {
			actorMostMovies = pa
		}
		fmt.Println(pa.Name)
		fmt.Println(pa.MovieCount)
		fmt.Println(pa.MovieOrders)
	}
	fmt.Println(len(popularActors))
	fmt.Println(popularDirectors)
	fmt.Println(len(popularDirectors))
}
