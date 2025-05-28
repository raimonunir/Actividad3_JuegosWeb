export class UIManager{
    constructor(scene){
        this.scene=scene;
        this.hi_score=9000;
        this.hi_scoreTXT;
        this.p1Score=0;
        this.p1ScoreTXT;

       
    }

    //Posicionamos el texto del score del player
    ponScores(){
        this.p1ScoreTXT = this.scene.add.bitmapText(2, 2, "blackOutlineFont", "P1-Score:"+this.p1Score);
        this.p1ScoreTXT.setFontSize(6);
        this.hi_scoreTXT = this.scene.add.bitmapText(120, 2, "redOutlineFont", "HI-Score:"+this.hi_score);
        this.hi_scoreTXT.setFontSize(6);
        //this.p1ScoreTXT.setDropShadow(13, 13, '#000000', 1); 
        //this.hi_ScoreTXT = this.scene.add.bitmapText(300, 2, "testFont", "Hi-Score:"+this.hi_score);

    }

    //sumamos puntos al score
    sumaScoreP1(score){
        this.p1Score+=score;
        //Vamos a intentar refrescar el texto
        this.p1ScoreTXT.setText("P1-Score:"+this.p1Score);

        if(this.p1Score>=this.hi_score){ //Si hemos alcanzado el hi-score también lo actualizamos
            this.hi_score=this.p1Score;
            this.hi_scoreTXT.setText("Hi-Score:"+this.hi_score);
        }
    }

}