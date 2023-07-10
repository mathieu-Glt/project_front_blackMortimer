<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Movie;
use App\Form\MovieType;
use App\Repository\MovieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Nelmio\CorsBundle\Annotations\Cors;


/**
 * @Route("/api/movies")
 */

class MovieController extends AbstractController
{


    private $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }


    /**
     * @Route("/new", name="app_movie_new", methods={"GET", "POST"})
     * @param MovieRepository $movieRepository
     * @param CategorieRepository $categorieRepository
     * @param ValidatorInterface $validator
     * @param Request $request
     * @return Response
     */
    public function new(Request $request, MovieRepository $movieRepository, ValidatorInterface $validator): Response
    {
        $movie = new Movie();

        $form = $this->createForm(MovieType::class, $movie);
        $form->handleRequest($request);


        if ($form->isSubmitted() && $form->isValid()) {
            // dd($categoryObject->getId());
            // die;
            $movie = new Movie();

            // dd($form->getData()->getTitle());
            // dd($form->get('category')->getData());
            // die;
            $movie->setTitle($form->getData()->getTitle());
            $movie->setPicture($form->getData()->getPicture());
            $movie->setSynopsis($form->getData()->getSynopsis());
            $movie->setMovie($form->getData()->getMovie());
            $movie->setMovie($form->getData()->getMovie());
            $movie->setSlug($form->getData()->getSlug());


            $em = $this->getDoctrine()->getManager();
            $categoryId = $form->get('category')->getData()->getId();
            $category = $em->getRepository(Category::class)->find($categoryId);
            // dd($category);


            $movie->setCategory($category);

            // $movie->setCategory($categoryObject->getId());
            $movie->setCreationTimesTamp(new \DateTimeImmutable());

            $movieRepository->add($movie, true);





            return $this->redirectToRoute('app_movie_index', [], Response::HTTP_SEE_OTHER);
        }


        return $this->renderForm('movie/new.html.twig', [
            'movie' => $movie,
            'form' => $form,
        ]);
    }

    /**
     * @Route("/list", name="app_movie_index", methods={"GET"})
     * @param MovieRepository $movieRepository
     * @param SerializerInterface $serializer
     * @return JsonResponse
     */
    public function index(MovieRepository $movieRepository, SerializerInterface $serializer): JsonResponse
    {
        $movieList = $movieRepository->findAll();


        if ($movieList) {
            return $this->json([
                'status' => Response::HTTP_OK,
                'results' => $movieList
            ], Response::HTTP_OK, [], ['groups' => ['getMovies', 'getUser']]);
        } else {
            return $this->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'results' => 'Bad request'
            ], Response::HTTP_BAD_REQUEST);
        }


        // $jsonMovieList = $serializer->serialize($movieList, 'json');
        // return new JsonResponse($jsonMovieList, Response::HTTP_OK, [], true);
    }

    /**
     * @Route("/list/{id}", name="app_movie_id_show", requirements={"id"="\d+"}, methods={"GET"})
     * @param MovieRepository $movieRepository
     * @param int $id
     * @return Response
     */
    public function showId(MovieRepository $movieRepository, int $id): Response
    {
        $movie = $movieRepository->find($id);
        // dd($movie);
        if ($movie) {
            return $this->json([
                'status' => Response::HTTP_OK,
                'results' => $movie
            ], Response::HTTP_OK);
        } else {
            return $this->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'results' => 'Bad request'
            ], Response::HTTP_BAD_REQUEST, ['groups' => ['getMovies', 'getUser']]);
        }
    }

    /**
     * @Route("/list/{slug}", name="app_movie_show", requirements={"slug"="[a-zA-Z]+"}, methods={"GET"})
     * @param MovieRepository $movieRepository
     * @param SerializerInterface $serializer
     * @param string $slug
     * @return Response
     */
    public function show(MovieRepository $movieRepository, SerializerInterface $serializer, string $slug): JsonResponse
    {
        // dd($slug);
        $movie = $movieRepository->findNameMovieAs($slug);
        // dd($movie);

        // $jsonMovie = $serializer->serialize($movie, 'json');
        if ($movie) {
            return $this->json([
                'status' => Response::HTTP_OK,
                'results' => $movie
            ], Response::HTTP_OK, ['groups' => ['getMovies', 'getUser']]);
        } else {
            return $this->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'results' => 'Bad request'
            ], Response::HTTP_BAD_REQUEST);
        }

        // return new JsonResponse($jsonMovie, Response::HTTP_OK, [], true);

        // return $this->render('movie/show.html.twig', [
        //     'movie' => $movie,
        // ]);
    }

    /**
     * @Route("/randoms", name="randoms")
     * @param MovieRepository $movieRepository
     * @return Response
     */
    public function manyRandom(MovieRepository $movieRepository, SerializerInterface $serializer): JsonResponse
    {
        $allMovies = $movieRepository->findAll();
        $randomMovies = [];
        $randomKey = array_rand($allMovies, 10);

        foreach ($randomKey as $key) {
            $randomMovies[] = $allMovies[$key];
        }

        $jsonMovies = $serializer->serialize($randomMovies, 'json', ['groups' => ['getUser', 'getMovies', 'getCategory', 'getFavorites']]);
        return new JsonResponse($jsonMovies, Response::HTTP_OK, [], true);
        // return $this->json(['status' => Response::HTTP_OK, 'results' => $jsonMovies], Response::HTTP_OK, ['groups' => ['getMovies', 'getUser', 'getCategory', 'getFavorites']]);
    }

    /**
     * @Route("/random", name="random", methods={"GET"})
     * @param MovieRepository $movieRepository
     * @return Response
     */
    public function random(MovieRepository $movieRepository): Response
    {
        $allMovies = $movieRepository->findAll();
        $randomKey = array_rand($allMovies, 1);
        $randomMovie = $allMovies[$randomKey];
        if ($randomMovie) {
            return $this->json([
                'status' => Response::HTTP_OK,
                'results' => $randomMovie
            ], Response::HTTP_OK, ['groups' => ['getMovies', 'getUser']]);
        } else {
            return $this->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'results' => 'Bad request'
            ], Response::HTTP_BAD_REQUEST);
        }


        // return $this->json($randomMovie, Response::HTTP_OK, []);
    }

    /**
     * @Route("/research", name="research", methods={"GET"})
     * @param MovieRepository $movieRepository
     * @param Request $request
     * @return Response
     */
    public function research(MovieRepository $movieRepository, Request $request): Response
    {
        $query = $request->query->get('q');
        if ($query) {
            // dd($query);
            $queryResultMovie = $movieRepository->findTitleAs($query);
            // dd($queryResultMovie);

            return $this->json([
                'status' => Response::HTTP_OK,
                'results' => $queryResultMovie
            ], Response::HTTP_OK, ['groups' => ['getMovies', 'getUser']]);
        } else {
            return $this->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'results' => 'Bad request'
            ], Response::HTTP_BAD_REQUEST);
        }
        // return $this->json($query, Response::HTTP_OK, []);

    }


    /**
     * @Route("/{id}/edit", name="app_movie_edit", methods={"GET", "POST"})
     * @param int $id
     * @param MovieRepository $movieRepository
     * @param Request $request
     * @param Movie $movie
     * @return Response
     */
    public function edit(Request $request, Movie $movie, MovieRepository $movieRepository): Response
    {
        $form = $this->createForm(MovieType::class, $movie);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $movieRepository->add($movie, true);

            return $this->redirectToRoute('app_movie_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('movie/edit.html.twig', [
            'movie' => $movie,
            'form' => $form,
        ]);
    }

    /**
     * @Route("/{id}/delete", name="app_movie_delete", methods={"POST"})
     * @param int $id
     * @param MovieRepository $movieRepository
     * @param Movie $movie
     * @param Request $request
     * @return Response
     */
    public function delete(Request $request, Movie $movie, MovieRepository $movieRepository): Response
    {
        if ($this->isCsrfTokenValid('delete' . $movie->getId(), $request->request->get('_token'))) {
            $movieRepository->remove($movie, true);
        }

        return $this->redirectToRoute('app_movie_index', [], Response::HTTP_SEE_OTHER);
    }
}


        // $movie->setTitle('Tintin et les cigares du Pharaon');
        // $movie->setPicture('27.jpg');
        // $movie->setSynopsis("Embarqué pour une croisière en mer Méditerranée, Tintin fait la connaissance de l’égyptologue Philémon Siclone, une rencontre qui le mènera en Égypte jusqu’au tombeau du pharaon Kih-Oskh. Bien malgré lui, Tintin se trouve alors confronté au trafic d’armes et d’opium. Ses aventures le conduisent d’abord en Arabie, puis en Inde, dans le royaume fictif de Rawhajpoutalah.");
        // $movie->setMovie("https://www.youtube.com/watch?v=NyGc1P4zp_E&list=PL4TMSDjRUYOnLSvWwRIT8Uz2EiUSSbFo9&index=2");
        // $movie->setRating(4);
        // $movie->setSlug('tintin-et-les-cigares-du-pharaon');
        // $movie->setCreationTimesTamp(new \DateTimeImmutable());

        // $movieRepository->add($movie, true);
