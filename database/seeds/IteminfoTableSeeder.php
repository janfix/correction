<?php

use Illuminate\Database\Seeder;

class IteminfoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         DB::table('iteminfos')->truncate();
        
        $iteminfos = [
        ['mediapath'=>'corrtext1',
            'corrname' =>'Candide',
            'subject' => 'French',
            'language' =>'French',
            'level'=>'Primary',
            'grade'=>'CM2',
            'instructions' =>'Lire ce texte à voix haute dans le microphone',
            'content' =>"Il y avait en Westphalie, dans le château de M. le baron de Thunder−ten−tronckh, un jeune garçon à qui la nature avait donné les mœurs les plus douces. Sa physionomie annonçait son âme. Il avait le jugement assez droit, avec l'esprit le plus simple ; c'est, je crois, pour cette raison qu'on le nommait Candide. Les anciens domestiques de la maison soupçonnaient qu'il était fils de la sœur de monsieur le baron et d'un bon et honnête gentilhomme du voisinage, que cette demoiselle ne voulut jamais épouser parce qu'il n'avait pu prouver que soixante et onze quartiers, et que le reste de son arbre généalogique avait été perdu par l'injure du temps. Monsieur le baron était un des plus puissants seigneurs de la Westphalie, car son château avait une porte et des fenêtres. Sa grande salle même était ornée d'une tapisserie. Tous les chiens de ses basses−cours composaient une meute dans le besoin ; ses palefreniers étaient ses piqueurs ; le vicaire du village était son grand aumônier. Ils l'appelaient tous monseigneur, et ils riaient quand il faisait des contes.",
            'content_ref' =>'Candide de Voltaire, Free edition, ',
            'itemtype' =>'Text_reading',
            'corrtype' =>'simple',
            'Author' =>'Paul Martin',
            'Institution' =>'DEPP',
            'datestart'=>'2019-10-10',
            'test_session_id' => 'ABCDE1234',
            'docLink' =>'http://www.wiquid.fr',
            'corrplan' =>'_'
        ], [
            'mediapath'=>'11102',
            'corrname' =>'Dino le petite dinosaure',
            'subject' => 'French',
            'language' =>'French',
            'level'=>'Primary',
            'grade'=>'CM2',
            'instructions' =>'Lire ce texte à voix haute dans le microphone',
            'content' =>"Dino, où es-tu ? crie papa. Ici, dans la mare. Depuis une heure, Dino, le petit dinosaure, se débat pour se dégager de la boue profonde. Il pleut, de grands oiseaux noirs volent dans le ciel sombre. Ils se préparent à attaquer Dino. Dino pose sa grande patte droite sur le bord de la mare et il essaie de sortir son corps de la boue. Son père arrive entre les arbres de la forêt qui borde la mare. Il attrape le cou de Dino entre ses dents et d’un coup, il soulève Dino. Il le pose sur la terre ferme. Sauvé ! crie Dino.",
            'content_ref' =>'Dino, texte original ',
            'itemtype' =>'Text_reading',
            'corrtype' =>'simple',
            'Author' =>'Pierre Martin',
            'Institution' =>'DEPP',
            'datestart'=>'2019-10-10',
            'test_session_id' => 'ABCDE1234',
            'docLink' =>'http://www.wiquid.fr/depp/ent',
            'corrplan' =>'_'
        ], [
            'mediapath'=>'corr1',
            'corrname' =>'Liste de mots CP',
            'subject' => 'French',
            'language' =>'French',
            'level'=>'Primary',
            'grade'=>'CM2',
            'instructions' =>'Lire ces mots à voix haute dans le microphone',
            'content' =>'{"words": ["la", "au", "tu", "un", "il", "été", "on", "mur", "ni", "sur", "qui", "vélo", "par", "feu", "ce", "peur", "ami", "moto", "peau", "lune", "gare", "lire", "bon", "mardi", "col", "avril", "roi", "faire", "facile", "cheval", "vrai", "ligne", "porte", "autre", "loup", "soir", "page", "raisin", "car", "sucre", "chat", "matin", "trésor", "soixante", "lundi", "rose", "visage", "six", "ciseau", "aout", "pays", "balai", "fille", "sept", "lourd", "femme", "garage", "hibou"]}',
            'content_ref' =>'Laboratoire de psychologie de Bretagne',
            'itemtype' =>'Word_reading',
            'corrtype' =>'simple',
            'Author' =>'Emile Golin',
            'Institution' =>'DEPP',
            'datestart'=>'2019-10-10',
            'test_session_id' => 'ABCDE1234',
            'docLink' =>'http://www.wiquid.fr/depp/ent',
            'corrplan' =>'50'
        ]
        ];

    DB::table('iteminfos')->insert($iteminfos);
    }
}
