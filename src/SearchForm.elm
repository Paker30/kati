port module SearchForm exposing (init, view, main)

import Browser
import Html exposing (Html)
import Html.Attributes exposing (class)
import Html.Attributes as Attributes
import Html.Events as Events
import Task
import List exposing (length)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode

port booksFromKati : ( Json.Encode.Value -> msg) -> Sub msg

main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }

type alias Book =
    { author : String
    , id : String
    , isRead: Bool
    , key : String
    , title : String
    , updated : Int
    }

type alias Model =
    { id : Maybe String
    , books : Maybe (List Book)
    , search : String
    , by : By
    }

type By =
    Author
    | Title

type Msg
    = Search (Maybe Book)
    | Submit
    | GotBooks (Result Decode.Error (List Book))
    | SubscribeBooks Json.Encode.Value
    | UpdateSearch String
    | UpdateBy By

init : () -> (Model, Cmd Msg)
init _ =
    ({ id = Nothing
     , books = Nothing
     , search = ""
     , by = Author
     }
    , Cmd.none
    )

update: Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UpdateSearch search ->
            ({ model | search = search }, Cmd.none)
        UpdateBy by ->
            ({ model | by = by }, Cmd.none)
        Search book ->
            ({ model | id = book |> Maybe.map .id }, Cmd.none)
        Submit ->
            (model, searchBook model.books model.by model.search Search)
        SubscribeBooks encodeBooks ->
            (model,  getBooks GotBooks encodeBooks)
        GotBooks result ->
            case result of
                Ok books ->
                    ({ model | books = Just books }, Cmd.none)
                Err _ ->
                    ({ model | books = Just [] }, Cmd.none)

subscriptions : Model -> Sub Msg
subscriptions _ =
    booksFromKati SubscribeBooks

view : Model -> Html Msg
view model =
    Html.form[Events.onSubmit Submit
    , Attributes.style "display" "flex"
    , Attributes.style "gap" "0.5rem"
    , Attributes.style "justify-content" "center"
    , Attributes.style "padding" "0.5rem"
    , Attributes.style "padding-bottom" "0.5rem"
    , Attributes.style "margin" "auto"
    , Attributes.style "background-color" "var(--brand-color_5)"
    , Attributes.style "img" "filter: invert(1);"
    ]
    [ Html.button [ class "btn"] [Html.img [class "icon",Attributes.src "search.svg", Attributes.alt "Search", Attributes.type_ "submit"] []]
    , Html.input [Attributes.placeholder "Search a book here..."
    , Attributes.type_ "text"
    , Events.onInput UpdateSearch
    ] []
    , Html.select []
        [ Html.option [Events.onClick (UpdateBy Author)] [Html.text "Author"]
        , Html.option [Events.onClick (UpdateBy Title)] [Html.text "Title"]
        ]
    , case model.books of
        Just books ->
            Html.span [] [Html.text (books |> length |> String.fromInt |> String.append " books to found")]
        Nothing ->
            Html.span [] [Html.text "No books to found"]
    , case model.id of
        Just id ->
            Html.span [] [Html.text ("Book ID: " ++ id)]
        Nothing ->
            Html.span [] [Html.text "No book found"]
    , Html.span [] [Html.text (model.by |> byToString)]   
    ]

searchBook : Maybe (List Book) -> By -> String -> (Maybe Book -> Msg) -> Cmd Msg
searchBook books by search toMsg =
    let
        matchedBooks =
            case books of
                Just bookList ->
                    List.filter (matchesSearch search by) bookList
                Nothing ->
                    []
    in
    Task.perform toMsg (Task.succeed (List.head matchedBooks))

matchesSearch : String -> By -> Book -> Bool
matchesSearch search by book =
    case by of
        Author ->
            String.contains search book.author
        Title ->
            String.contains search book.title

getBooks : (Result Decode.Error (List Book) -> Msg) -> Json.Encode.Value -> Cmd Msg
getBooks toMsg encodeBooks =
    Task.perform toMsg (Task.succeed (Decode.decodeValue booksDecoder encodeBooks))

bookDecoder : Decoder Book
bookDecoder =
    Decode.map6 Book
        (Decode.field "author" Decode.string)
        (Decode.field "id" Decode.string)
        (Decode.field "isRead" Decode.bool)
        (Decode.field "key" Decode.string)
        (Decode.field "title" Decode.string)
        (Decode.field "updated" Decode.int)

booksDecoder : Decoder (List Book)
booksDecoder =
    Decode.list bookDecoder

byToString : By -> String
byToString by =
    case by of
        Author ->
            "Author"
        Title ->
            "Title"