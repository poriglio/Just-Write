angular.module("storyApp").factory("badgeFactory",function(){

	var badges = []

	var Badge = function(name,image,description){
		this.name        = name
		this.image       = image
		this.description = description
		badges.push(this)
	}

	var story1 = new Badge("Story Squirrel","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by submitting a story.")
	var story2 = new Badge("Porcupine Page","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by submitting 5 stories.")
	var story3 = new Badge("Writer Raccoon","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by submitting 10 stories.")
	var story4 = new Badge("Fiction Fox","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by submitting 25 stories.")
	var story5 = new Badge("Book Bear","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by submitting 50 stories.")

	var essay1 = new Badge("Quill Quail","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by submitting an essay.")
	var essay2 = new Badge("Truth Turtle","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by submitting 5 essays.")
	var essay3 = new Badge("Diction Duck","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by submitting 10 essays.")
	var essay4 = new Badge("Syntax Snake","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by submitting 25 essays.")
	var essay5 = new Badge("Word Wolf","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by submitting 50 essays.")

	var poem1 = new Badge("Ode Owl","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by submitting a poem.")
	var poem2 = new Badge("Rhyme Rabbit","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by submitting 5 poems.")
	var poem3 = new Badge("Ballad Beaver","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by submitting 10 poems.")
	var poem4 = new Badge("Verse Vulture","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by submitting 25 poems.")
	var poem5 = new Badge("Meter Moose","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by submitting 50 poems.")

	var total1 = new Badge("River","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by having 10 total submissions.")
	var total2 = new Badge("Forest","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by having 20 total submissions.")
	var total3 = new Badge("Mountains","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by having 50 total submissions.")
	var total4 = new Badge("Stars","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by having 100 total submissions.")

	var types2 = new Badge("New Leaf","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by having submissions of two different types.")
	var types3 = new Badge("Branching Out","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by having submissions of all three types.")

	var comment1 = new Badge("Hive","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by writing 10 comments on others' submissions.")
	var comment2 = new Badge("Run","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by writing 25 comments on others' submissions.")
	var comment3 = new Badge("Flock","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by writing 50 comments on others' submissions.")
	var comment4 = new Badge("Pack","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by writing 100 comments on others' submissions.")
	var comment5 = new Badge("Herd","https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150","Earned by writing 200 comments on others' submissions.")

	return {
		badges : badges,
	}
})