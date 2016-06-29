!function() {
    "use strict";
    console.log("creating module 72");
    var app = angular.module("emblemsApp", [ "ngRoute", "routeStyles", "ngSanitize", "ui.bootstrap-slider", "firebase", "emblemsServices" ]);
    app.config([ "$routeProvider", "$locationProvider", "$sceProvider", function($routeProvider, $locationProvider, $sceProvider) {
        $routeProvider.when("/cemeteryfighter/about/", {
            templateUrl: "/Views/cemFigAbout.html",
            css: "darkly.min.css"
        }).when("/cemeteryfighter/heroes/", {
            templateUrl: "/Views/cemFigHeroes.html",
            css: "darkly.min.css"
        }).when("/cemeteryfighter/emblems/", {
            templateUrl: "/Views/cemFigEmblems.html",
            css: "darkly.min.css"
        }).when("/cemeteryfighter/items/", {
            templateUrl: "/Views/cemFigItems.html",
            css: "darkly.min.css"
        }).when("/cemeteryfighter/stages/", {
            templateUrl: "/Views/cemFigStages.html",
            css: "darkly.min.css"
        }).when("/cemeteryfighter/media/", {
            templateUrl: "/Views/cemFigMedia.html",
            controller: "CemFigMediaController",
            css: "darkly.min.css"
        }).when("/wonderest/about/", {
            templateUrl: "/Views/wonderestAbout.html",
            css: "flatly.min.css"
        }).when("/wonderest/play/", {
            templateUrl: "/Views/wonderestPlay.html"
        }).when("/elemental/about/", {
            templateUrl: "/Views/elementalAbout.html",
            css: "ele.min.css"
        }).when("/other/about/", {
            templateUrl: "/Views/otherAbout.html",
            css: "ele.min.css"
        }).when("/home/", {
            templateUrl: "/Views/home.html"
        }).otherwise({
            redirectTo: "/home/"
        }), $locationProvider.html5Mode(!0), $sceProvider.enabled(!1);
    } ]);
}(), function() {
    "use strict";
    function _showValidationErrors($scope, error) {
        if ($scope.validationErrors = [], error.data && angular.isObject(error.data)) for (var key in error.data) $scope.validationErrors.push(error.data[key][0]); else $scope.validationErrors.push("Could not add emblem.");
    }
    console.log("registering controllers");
    var controllers = angular.module("emblemsApp");
    controllers.controller("DebugController", [ "$scope", function($scope) {
        $scope.debugString = "This is a debug controller!";
    } ]), controllers.controller("EmblemsListController", [ "$scope", "Emblem", function($scope, Emblem) {
        $scope.emblems = Emblem.query();
    } ]), controllers.controller("EmblemsAddController", [ "$scope", "$location", "Emblem", function($scope, $location, Emblem) {
        $scope.emblem = new Emblem(), $scope.add = function() {
            $scope.emblem.$save(function() {
                $location.path("/emblems/list");
            }, function(error) {
                _showValidationErrors($scope, error);
            });
        };
    } ]), controllers.controller("EmblemsEditController", [ "$scope", "$routeParams", "$location", "Emblem", function($scope, $routeParams, $location, Emblem) {
        $scope.emblem = Emblem.get({
            id: $routeParams.id
        }), $scope.edit = function() {
            $scope.emblem.$save(function() {
                $location.path("/emblems/list");
            }, function(error) {
                _showValidationErrors($scope, error);
            });
        };
    } ]);
}(), function() {
    "use strict";
    console.log("registering Blog"), angular.module("emblemsApp").controller("BlogController", [ "$scope", "FireBlogEntry", function($scope, FireBlogEntry) {
        $scope.blogEntries = FireBlogEntry, $scope.setBlogEntry = function(bodyLink) {
            $scope.bodyLink = "/blogs/" + bodyLink + ".html";
        };
    } ]).directive("jmBlog", [ "$window", function($window) {
        function link(scope, element, attrs) {}
        var directive = {
            link: link,
            controller: "BlogController",
            restrict: "EA",
            templateUrl: "/partials/_blog.html"
        };
        return directive;
    } ]);
}(), function() {
    "use strict";
    console.log("registering cemfig media"), angular.module("emblemsApp").controller("CemFigMediaController", [ "$scope", "FireCemFigScreenshot", function($scope, FireCemFigScreenshot) {
        FireCemFigScreenshot.$loaded().then(function(data) {
            $scope.screenshots = data;
        });
    } ]);
}(), function() {
    "use strict";
    console.log("registering cemFigNav"), angular.module("emblemsApp").controller("CemFigNavController", [ "$scope", "$location", function($scope, $location) {
        $scope.links = [ {
            name: "About",
            link: "/cemeteryfighter/about/"
        }, {
            name: "Heroes",
            link: "/cemeteryfighter/heroes/"
        }, {
            name: "Stages",
            link: "/cemeteryfighter/stages/"
        }, {
            name: "Items",
            link: "/cemeteryfighter/items/"
        }, {
            name: "Emblems",
            link: "/cemeteryfighter/emblems/"
        }, {
            name: "Media",
            link: "/cemeteryfighter/media/"
        } ], $scope.setActive = function(link) {
            $scope.activeLink = link;
        }, $scope.setActive($location.path());
    } ]).directive("jmCemFigNav", [ "$window", function($window) {
        function link(scope, element, attrs) {}
        var directive = {
            link: link,
            controller: "CemFigNavController",
            restrict: "EA",
            templateUrl: "/partials/_cemFigNav.html"
        };
        return directive;
    } ]);
}(), function() {
    "use strict";
    console.log("registering emblems"), angular.module("emblemsApp").controller("EmblemHeroController", [ "$scope", "FireHero", "FireSpell", "FireEmblem", function($scope, FireHero, FireSpell, FireEmblem) {
        FireHero.$loaded().then(function(data) {
            $scope.heroes = data;
        }), FireSpell.$loaded().then(function(data) {
            $scope.spells = data, FireEmblem.$loaded().then(function(edata) {
                $scope.allEmblems = edata, $scope.filterEmblems = function(spellName) {
                    for (var filtered = [], i = 0; i < $scope.allEmblems.length; i++) {
                        var item = $scope.allEmblems[i];
                        item.spell == spellName && filtered.push(item);
                    }
                    return filtered;
                }, $scope.setSpell = function(current) {
                    $scope.spellName = current.name, $scope.currentSpell = current, $scope.spellDescription = current.description, 
                    $scope.level = 10, $scope.emblems = $scope.filterEmblems($scope.spellName);
                }, $scope.setSpell(data[0]);
            });
        });
    } ]).controller("EmblemController", [ "$scope", function($scope) {
        $scope.createEmblemIcon = function(ele, symbol) {
            var container = document.createElement("canvas");
            container.setAttribute("width", "96px"), container.setAttribute("height", "96px"), 
            ele.appendChild(container), paper.setup(container);
            var width = 96, height = 96, backRaster = $scope.loadImageProper("/images/CemeteryFighter/Emblems/" + symbol + "Outer.png", width, height), frontRaster = $scope.loadImageProper("/images/CemeteryFighter/Emblems/" + symbol + "Inner.png", width, height);
            backRaster.onFrame = function(event) {
                backRaster.rotate(.25);
            }, frontRaster.onFrame = function(event) {
                frontRaster.rotate(-.25);
            };
        }, $scope.loadImageProper = function(imageLink, width, height) {
            var raster = new paper.Raster(imageLink);
            return raster.width = width, raster.height = height, raster.position = paper.view.center, 
            raster.onLoad = function() {
                raster.width = width, raster.height = height, raster.position = paper.view.center;
            }, raster;
        }, $scope.getUnlockIcon = function(unlock) {
            return "boss" == unlock ? "/images/CemeteryFighter/Boss.png" : "multi" == unlock ? "/images/CemeteryFighter/web.png" : "/images/CemeteryFighter/Chest.png";
        }, $scope.getUnlockText = function(unlock) {
            return "boss" == unlock ? "This emblem is unlocked from beating a boss" : "multi" == unlock ? "This emblem is unlocked from winning multiplayer games" : "This emblem is unlocked from finding it in a chest";
        };
    } ]).directive("jmEmblemHero", [ "$compile", function($compile) {
        function link(scope, element, attrs) {
            var update = function() {
                var newElement = $compile("<jm-emblem></jm-emblem>")(scope);
                element.replaceWith(newElement);
            };
            scope.$watch("spellName", function(newValue, oldValue) {
                update();
            });
        }
        var directive = {
            link: link,
            controller: "EmblemHeroController"
        };
        return directive;
    } ]).directive("jmEmblem", [ "$window", function($window) {
        function link(scope, element, attrs) {}
        var directive = {
            link: link,
            restrict: "EA",
            controller: "EmblemController",
            templateUrl: "/partials/_emblem.html"
        };
        return directive;
    } ]).directive("jmEmblemIcon", [ "$window", function($window) {
        function link(scope, element, attrs) {
            scope.createEmblemIcon(element.context, scope.emblem.symbol);
        }
        var directive = {
            link: link,
            restrict: "EA"
        };
        return directive;
    } ]);
}(), function() {
    "use strict";
    console.log("registering heroes"), angular.module("emblemsApp").controller("HeroesController", [ "$scope", "FireHero", "FireSpell", function($scope, FireHero, FireSpell) {
        FireHero.$loaded().then(function(data) {
            $scope.heroes = data, FireSpell.$loaded().then(function(data) {
                $scope.allSpells = data, $scope.filterSpells = function(heroId) {
                    for (var filtered = [], i = 0; i < $scope.allSpells.length; i++) {
                        var item = $scope.allSpells[i];
                        item.heroClassId == heroId && filtered.push(item);
                    }
                    return filtered;
                }, $scope.setHero = function(current) {
                    console.log("being set to " + current), $scope.heroId = current, $scope.spells = $scope.filterSpells($scope.heroId);
                }, $scope.setHero(1);
            });
        }), $scope.level = 10;
    } ]).controller("HeroController", [ "$scope", "$compile", "FireSpell", function($scope, $compile, FireSpell) {
        $scope.setSpellDescription = function(d) {
            $scope.spellDescription = d, console.log($scope.spellDescription);
        };
    } ]).directive("jmHeroes", [ "$compile", function($compile) {
        function link(scope, element, attrs) {
            var update = function() {
                var newElement = $compile("<jm-hero></jm-hero>")(scope);
                element.replaceWith(newElement);
            };
            scope.$watch("heroId", function(newValue, oldValue) {
                update();
            });
        }
        var directive = {
            link: link,
            controller: "HeroesController"
        };
        return directive;
    } ]).directive("jmHero", [ "$window", "$compile", "$sce", function($window, $compile, $sce) {
        function link(scope, element, attrs) {
            scope.evaluateDescription = function(description, index) {
                var fromServer = angular.element("<div>" + description + "</div>");
                $window.topValue = $compile(fromServer)(scope);
            };
        }
        var directive = {
            link: link,
            restrict: "EA",
            controller: "HeroController",
            templateUrl: "/partials/_hero.html"
        };
        return directive;
    } ]).directive("jmSpellDescription", [ "$window", "$compile", function($window, $compile) {
        function link(scope, element, attrs) {
            var update = function() {
                var newElement = $compile("<div>" + scope.spellDescription + "<div>")(scope);
                element.empty(), element.append(newElement);
            };
            scope.fifthsDamage = function(level, percent) {
                var damage = 2 * percent * (level / 5 + .8);
                return Math.round(10 * damage);
            }, scope.$watch("spellDescription", function(newValue, oldValue) {
                update();
            });
        }
        var directive = {
            link: link,
            restrict: "EA"
        };
        return directive;
    } ]);
}();

var topValue;

!function() {
    "use strict";
    console.log("registering items"), angular.module("emblemsApp").controller("ItemSlotController", [ "$scope", "FireItem", function($scope, FireItem) {
        $scope.itemSlots = [ {
            id: 0,
            name: "Offence",
            icon: "/images/CemeteryFighter/SilverBlade.png",
            color: "red"
        }, {
            id: 1,
            name: "Defence",
            icon: "/images/CemeteryFighter/Tough.png",
            color: "blue"
        }, {
            id: 2,
            name: "Utility",
            icon: "/images/CemeteryFighter/All.png",
            color: "green"
        } ], FireItem.$loaded().then(function(data) {
            $scope.allItems = data, $scope.filterItems = function(slotId) {
                for (var filtered = [], i = 0; i < $scope.allItems.length; i++) {
                    var item = $scope.allItems[i];
                    item.itemSlot == slotId && filtered.push(item);
                }
                return filtered;
            }, $scope.setItemSlot = function(current) {
                console.log("slot being set to " + current), $scope.slotId = current, $scope.slotItems = $scope.filterItems($scope.slotId);
            }, $scope.setItemSlot(0);
        });
    } ]).filter("sameRarity", function() {
        return function(items, rarity) {
            for (var filtered = [], i = 0; i < items.length; i++) {
                var item = items[i];
                item.rarity == rarity && filtered.push(item);
            }
            return filtered;
        };
    }).controller("ItemController", [ "$scope", "$filter", function($scope, $filter) {
        $scope.allRarity = [ {
            arr: 0
        }, {
            arr: 1
        }, {
            arr: 2
        }, {
            arr: 3
        } ], $scope.getRarityName = function(rarity) {
            return 0 == rarity ? "Beginner" : 1 == rarity ? "Common" : 2 == rarity ? "Rare" : 3 == rarity ? "Awesome" : void 0;
        };
    } ]).directive("jmItemSlots", [ "$compile", function($compile) {
        function link(scope, element, attrs) {
            var update = function() {
                var newElement = $compile("<jm-item></jm-item>")(scope);
                element.replaceWith(newElement);
            };
            scope.$watch("slotId", function(newValue, oldValue) {
                update();
            });
        }
        var directive = {
            link: link,
            controller: "ItemSlotController"
        };
        return directive;
    } ]).directive("jmItem", [ "$window", function($window) {
        function link(scope, element, attrs) {}
        var directive = {
            link: link,
            restrict: "EA",
            controller: "ItemController",
            templateUrl: "/partials/_item.html"
        };
        return directive;
    } ]);
}(), function() {
    "use strict";
    console.log("registering newUpcoming"), angular.module("emblemsApp").controller("NewUpcomingController", [ "$scope", "NewUpcoming", function($scope, NewUpcoming) {
        NewUpcoming.query().$promise.then(function(data) {
            $scope.newItems = data;
        });
    } ]).directive("jmNewUpcoming", [ "$window", function($window) {
        function link(scope, element, attrs) {}
        var directive = {
            link: link,
            controller: "NewUpcomingController",
            restrict: "EA",
            templateUrl: "/partials/_newUpcoming.html"
        };
        return directive;
    } ]);
}(), function() {
    "use strict";
    console.log("registering stages"), angular.module("emblemsApp").controller("StagesController", [ "$scope", "FireStage", "FireMonster", function($scope, FireStage, FireMonster) {
        FireStage.$loaded().then(function(data) {
            $scope.stages = data, FireMonster.$loaded().then(function(mdata) {
                $scope.allMonsters = mdata, $scope.filterMonsters = function(stageId) {
                    for (var filtered = [], i = 0; i < $scope.allMonsters.length; i++) {
                        var item = $scope.allMonsters[i];
                        item.stageId == stageId && filtered.push(item);
                    }
                    return filtered;
                }, $scope.setStage = function(current) {
                    console.log("being set to " + current), $scope.stageId = current, $scope.monsters = $scope.filterMonsters($scope.stageId);
                }, $scope.setStage(1);
            });
        });
    } ]).controller("StageController", [ "$scope", function($scope) {} ]).directive("jmStages", [ "$compile", function($compile) {
        function link(scope, element, attrs) {
            var update = function() {
                var newElement = $compile("<jm-stage></jm-stage>")(scope);
                element.replaceWith(newElement);
            };
            scope.$watch("stageId", function(newValue, oldValue) {
                update();
            });
        }
        var directive = {
            link: link,
            controller: "StagesController"
        };
        return directive;
    } ]).directive("jmStage", [ "$window", function($window) {
        function link(scope, element, attrs) {}
        var directive = {
            link: link,
            restrict: "EA",
            controller: "StageController",
            templateUrl: "/partials/_stage.html"
        };
        return directive;
    } ]);
}(), function() {
    "use strict";
    console.log("registering topBar"), angular.module("emblemsApp").controller("TopBarController", [ "$scope", function($scope) {
        $scope.setProject = function(current, sheet) {
            $scope.mainProject = current, swapStyleSheet(sheet);
        };
    } ]).directive("jmTopBar", [ "$window", function($window) {
        function link(scope, element, attrs) {}
        var directive = {
            link: link,
            controller: "TopBarController",
            restrict: "EA",
            templateUrl: "/partials/_topBar.html"
        };
        return directive;
    } ]);
}(), function() {
    "use strict";
    function FireEmblem($firebaseArray, id) {
        var ref = new Firebase("https://intense-inferno-8139.firebaseio.com/cemeteryFighter/emblems/");
        return $firebaseArray(ref);
    }
    function NewUpcoming($resource) {
        return $resource("/api/newupcoming/:id");
    }
    function FireBlogEntry($firebaseArray) {
        var ref = new Firebase("https://intense-inferno-8139.firebaseio.com/cemeteryFighter/blogEntries");
        return $firebaseArray(ref);
    }
    function FireCemFigScreenshot($firebaseArray) {
        var ref = new Firebase("https://intense-inferno-8139.firebaseio.com/cemeteryFighter/screenshots");
        return $firebaseArray(ref);
    }
    function FireHero($firebaseArray) {
        var ref = new Firebase("https://intense-inferno-8139.firebaseio.com/cemeteryFighter/heroes/");
        return $firebaseArray(ref);
    }
    function FireStage($firebaseArray) {
        var ref = new Firebase("https://intense-inferno-8139.firebaseio.com/cemeteryFighter/stages/");
        return $firebaseArray(ref);
    }
    function FireSpell($firebaseArray, id) {
        var ref = new Firebase("https://intense-inferno-8139.firebaseio.com/cemeteryFighter/spells/");
        return $firebaseArray(ref);
    }
    function FireMonster($firebaseArray, id) {
        var ref = new Firebase("https://intense-inferno-8139.firebaseio.com/cemeteryFighter/monsters/");
        return $firebaseArray(ref);
    }
    function FireItem($firebaseArray, id) {
        var ref = new Firebase("https://intense-inferno-8139.firebaseio.com/cemeteryFighter/items/");
        return $firebaseArray(ref);
    }
    angular.module("emblemsServices", [ "ngResource" ]), angular.module("emblemsServices").factory("FireEmblem", FireEmblem), 
    FireEmblem.$inject = [ "$firebaseArray" ], angular.module("emblemsServices").factory("NewUpcoming", NewUpcoming), 
    NewUpcoming.$inject = [ "$resource" ], angular.module("emblemsServices").factory("FireBlogEntry", FireBlogEntry), 
    FireBlogEntry.$inject = [ "$firebaseArray" ], angular.module("emblemsServices").factory("FireCemFigScreenshot", FireCemFigScreenshot), 
    FireCemFigScreenshot.$inject = [ "$firebaseArray" ], angular.module("emblemsServices").factory("FireHero", FireHero), 
    FireHero.$inject = [ "$firebaseArray" ], angular.module("emblemsServices").factory("FireStage", FireStage), 
    FireStage.$inject = [ "$firebaseArray" ], angular.module("emblemsServices").factory("FireSpell", FireSpell), 
    FireSpell.$inject = [ "$firebaseArray" ], angular.module("emblemsServices").factory("FireMonster", FireMonster), 
    FireMonster.$inject = [ "$firebaseArray" ], angular.module("emblemsServices").factory("FireItem", FireItem), 
    FireItem.$inject = [ "$firebaseArray" ];
}();