port module SearchForm exposing (init, view, main)

import Browser
import Html exposing (Html)
import Html.Attributes exposing (class)
import Html.Attributes as Attributes
import Html.Events as Events
import Json.Encode as Encode

port searchResults : Encode.Value -> Cmd msg

main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }

type alias Model =
    { inputText : String
    , by : Category
    }

type Category =
    Author
    | Title

type alias Selection = 
    { keyword : String
    , category : Category
    }

type Msg
    = UpdateSearch String
    | Submit Selection
    | UpdateBy Category

init : () -> (Model, Cmd Msg)
init _ =
    ({ inputText = ""
     , by = Author
     }
    , Cmd.none
    )

update: Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UpdateSearch search ->
            ({ model | inputText = search }, Cmd.none)
        UpdateBy by ->
            ({ model | by = by }, Cmd.none)
        Submit selection ->
            (model, (searchResults << selectionEncoder) selection)

view : Model -> Html Msg
view model =
    Html.form[Events.onSubmit (Submit { keyword = model.inputText, category = model.by })
    , Attributes.style "display" "flex"
    , Attributes.style "gap" "0.5rem"
    , Attributes.style "justify-content" "center"
    , Attributes.style "padding" "0.5rem"
    , Attributes.style "padding-bottom" "0.5rem"
    , Attributes.style "margin" "auto"
    , Attributes.style "background-color" "var(--brand-color_5)"
    , Attributes.style "img" "filter: invert(1);"
    ]
    [ Html.input [Attributes.placeholder "Search a book here..."
    , Attributes.type_ "text"
    , Events.onInput UpdateSearch
    ] []
    , Html.select [ Events.onInput (UpdateBy << stringToBy) ]
        ( List.map
            (\option ->
                Html.option [ Attributes.value (byToString option) ] [ Html.text (byToString option) ]
            )
            [ Author, Title ]
        )
    , Html.button [ class "btn"] [Html.img [class "icon",Attributes.src "search.svg", Attributes.alt "Search", Attributes.type_ "submit"] []]
    ]

byToString : Category -> String
byToString by =
    case by of
        Author ->
            "Author"
        Title ->
            "Title"

stringToBy : String -> Category
stringToBy by =
    case by of
        "Author" ->
            Author
        "Title" ->
            Title
        _ ->
            Author

selectionEncoder : Selection -> Encode.Value
selectionEncoder selection =
    Encode.object
        [ ("keyword", Encode.string selection.keyword)
        , ("category", Encode.string (byToString selection.category))
        ]