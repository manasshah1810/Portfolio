"use client";

import React, { useState } from "react";
import "./gallery.css";
import {
    Library,
    Clock,
    Share2,
    Heart,
    Users,
    MapPin,
    Layers,
    Image as ImageIcon,
    Download,
    ChevronLeft,
    ChevronRight,
    Search,
    Plus,
    Info,
    LayoutGrid,
    MoreHorizontal
} from "lucide-react";
import { TrafficLights } from "./Window";

interface MediaItem {
    id: string;
    url: string;
    type: "image" | "video";
    date: string;
    location: string;
    album: string;
    title: string;
    description: string;
    size: string;
    dimensions: string;
}

const ALBUMS = [
    { id: "internships", name: "Internships", icon: <ImageIcon size={18} /> },
    { id: "hackerrank", name: "HackerRank", icon: <ImageIcon size={18} /> },
    { id: "courses", name: "Courses", icon: <ImageIcon size={18} /> },
    { id: "hackathons", name: "Hackathons", icon: <ImageIcon size={18} /> },
];

export const GalleryHeader: React.FC<any> = ({ id, onClose, onMinimize, toggleMaximize, handleMouseDown, onToggleInfo, isInfoOpen, viewMode, setViewMode }) => {
    return (
        <div className="gallery-window-header" onMouseDown={handleMouseDown}>
            <div className="gallery-header-left">
                <TrafficLights
                    onClose={() => onClose(id)}
                    onMinimize={() => onMinimize(id)}
                    onMaximize={toggleMaximize}
                />
            </div>

            <div className="gallery-header-toolbar">
                <div className="toolbar-section-left">
                    <button className="toolbar-btn"><ImageIcon size={16} /> <span>Both Libraries</span> <ChevronLeft size={10} style={{ transform: 'rotate(-90deg)' }} /></button>
                    <div className="zoom-slider-container">
                        <span className="zoom-label">-</span>
                        <input type="range" className="zoom-slider" min="1" max="100" defaultValue="50" />
                        <span className="zoom-label">+</span>
                    </div>
                </div>

                <div className="toolbar-center">
                    <div className="segmented-control">
                        <button className={`segment ${viewMode === 'years' ? 'active' : ''}`} onClick={() => setViewMode('years')}>Years</button>
                        <button className={`segment ${viewMode === 'months' ? 'active' : ''}`} onClick={() => setViewMode('months')}>Months</button>
                        <button className={`segment ${viewMode === 'days' ? 'active' : ''}`} onClick={() => setViewMode('days')}>Days</button>
                        <button className={`segment ${viewMode === 'all' ? 'active' : ''}`} onClick={() => setViewMode('all')}>All Photos</button>
                    </div>
                </div>

                <div className="toolbar-right">
                    <button
                        className={`toolbar-icon-btn ${isInfoOpen ? 'active' : ''}`}
                        onClick={onToggleInfo}
                    >
                        <Info size={18} />
                    </button>
                    <button className="toolbar-icon-btn"><Share2 size={18} /></button>
                    <button className="toolbar-icon-btn"><Heart size={18} /></button>
                    <button className="toolbar-icon-btn"><Download size={18} /></button>
                    <div className="gallery-search-container">
                        <Search size={14} className="search-icon" />
                        <input type="text" placeholder="Search" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ALBUM_DATA: Record<string, MediaItem[]> = {
    internships: [
        { id: "i1", url: "/internships/Acmegrade Internship Completion.jpg", type: "image", date: "Aug 2023", location: "Remote", album: "internships", title: "Acmegrade Internship Completion", description: "Successfully completed a 2-month intensive internship focusing on full-stack development. Gained hands-on experience with production-level codebases and agile methodologies.", size: "127 KB", dimensions: "1200 x 800" },
        { id: "i2", url: "/internships/Hophead Completion Certificate_page-0001 (1).jpg", type: "image", date: "June 2024", location: "Remote", album: "internships", title: "HopHead Completion Certificate", description: "Recognition for outstanding contribution to mobile app development. Focused on UI/UX implementation and integrating complex API endpoints.", size: "419 KB", dimensions: "2480 x 3508" },
        { id: "i3", url: "/internships/Java CodSoft Completion_page-0001.jpg", type: "image", date: "Jan 2024", location: "Remote", album: "internships", title: "Java CodSoft Completion", description: "Mastery of Java core concepts, multithreading, and complex data structures during a specialized virtual internship program.", size: "350 KB", dimensions: "2480 x 3508" },
        { id: "i4", url: "/internships/Javascipt CodSoft Completion_page-0001.jpg", type: "image", date: "Jan 2024", location: "Remote", album: "internships", title: "Javascript CodSoft Completion", description: "Advanced JavaScript techniques including ES6+, DOM manipulation, and asynchronous programming in a project-driven environment.", size: "351 KB", dimensions: "2480 x 3508" },
        { id: "i5", url: "/internships/Manas Shah Flutter_page-0001.jpg", type: "image", date: "Mar 2024", location: "Remote", album: "internships", title: "Manas Shah Flutter Certificate", description: "In-depth training in Flutter widget architecture, state management with Bloc/Provider, and cross-platform optimization.", size: "377 KB", dimensions: "2480 x 3508" },
    ],
    courses: [
        { id: "c1", url: "/courses/AWS Builders Python and AI Bootcamp_page-0001.jpg", type: "image", date: "2023", location: "Online", album: "courses", title: "AWS Builders Python & AI", description: "Learned cloud-native AI implementation and Python automation. Covered AWS SageMaker, Lambda, and DynamoDB integrations.", size: "3.5 MB", dimensions: "3200 x 2400" },
        { id: "c2", url: "/courses/Acmegrade Training Completion.jpg", type: "image", date: "2023", location: "Online", album: "courses", title: "Acmegrade Training Completion", description: "Foundational training in modern web technologies. Focused on responsive design, CSS Grid/Flexbox, and semantic HTML.", size: "127 KB", dimensions: "1200 x 800" },
        { id: "c3", url: "/courses/Devtown Python and AI Bootcamp_page-0001.jpg", type: "image", date: "2023", location: "Online", album: "courses", title: "Devtown Python & AI", description: "Hands-on bootcamp covering machine learning algorithms, data processing with Pandas/NumPy, and predictive modeling.", size: "650 KB", dimensions: "2000 x 1500" },
        { id: "c4", url: "/courses/UIUX _page-0001.jpg", type: "image", date: "2023", location: "Online", album: "courses", title: "UI/UX Design Certificate", description: "Exploration of user-centric design principles. Created wireframes and high-fidelity prototypes using Figma and Adobe XD.", size: "770 KB", dimensions: "2500 x 1800" },
    ],
    hackathons: [
        { id: "h1", url: "/hackathons/Hack2skill-Certificate.png", type: "image", date: "2024", location: "Mumbai", album: "hackathons", title: "Hack2skill Certificate", description: "Participation in a high-intensity hackathon. Developed a sustainable tech solution for urban waste management within 36 hours.", size: "1.1 MB", dimensions: "3000 x 2000" },
        { id: "h2", url: "/hackathons/Polyhacks Hackathon.jpg", type: "image", date: "2023", location: "Mumbai", album: "hackathons", title: "PolyHacks Participation", description: "Technical lead for a team of four at PolyHacks. Developed an automated attendance system using facial recognition.", size: "212 KB", dimensions: "1800 x 1200" },
        { id: "h3", url: "/hackathons/Manas_Shah_Certificate_page-0001.jpg", type: "image", date: "2024", location: "Mumbai", album: "hackathons", title: "Mumbai Tech Hackathon", description: "Awarded for exceptional innovation in the FinTech category. Built a decentralized peer-to-peer lending platform prototype.", size: "423 KB", dimensions: "2480 x 3508" },
    ],
    hackerrank: [
        { id: "r1", url: "/hackerrank/Hackerank Javascipt_page-0001.jpg", type: "image", date: "2024", location: "HackerRank", album: "hackerrank", title: "HackerRank JavaScript (Gold)", description: "Certified expert-level proficiency in JavaScript algorithms. Solved over 50 complex challenges with optimized time complexity.", size: "2.8 MB", dimensions: "3500 x 2500" },
        { id: "r2", url: "/hackerrank/Hackerrank Java_page-0001.jpg", type: "image", date: "2024", location: "HackerRank", album: "hackerrank", title: "HackerRank Java (Gold)", description: "Demonstrated advanced Java programming skills. Expert in OOP principles, collections framework, and stream API.", size: "2.8 MB", dimensions: "3500 x 2500" },
        { id: "r3", url: "/hackerrank/Hackerrank Python_page-0001.jpg", type: "image", date: "2024", location: "HackerRank", album: "hackerrank", title: "HackerRank Python (Gold)", description: "High-tier Python certification. Mastery in decorators, generators, and data science libraries like Matplotlib and SciPy.", size: "2.8 MB", dimensions: "3500 x 2500" },
        { id: "r4", url: "/hackerrank/Hackerrank SQL_page-0001.jpg", type: "image", date: "2024", location: "HackerRank", album: "hackerrank", title: "HackerRank SQL (Gold)", description: "Advanced database querying. Expert in complex joins, subqueries, and database performance tuning on large datasets.", size: "2.8 MB", dimensions: "3500 x 2500" },
    ]
};

const Gallery: React.FC<{ isInfoOpen?: boolean; onToggleInfo?: () => void; viewMode?: string; setViewMode?: (mode: string) => void }> = ({ isInfoOpen = false, onToggleInfo, viewMode = 'days', setViewMode }) => {
    const [selectedAlbum, setSelectedAlbum] = useState("Library");
    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
    const [viewingItem, setViewingItem] = useState<MediaItem | null>(null);

    const getDisplayItems = () => {
        if (selectedAlbum === "Library") {
            return [
                ...ALBUM_DATA.internships,
                ...ALBUM_DATA.courses,
                ...ALBUM_DATA.hackathons,
                ...ALBUM_DATA.hackerrank,
            ];
        }
        return ALBUM_DATA[selectedAlbum] || [];
    };

    const items = getDisplayItems();

    // Set initial selection
    React.useEffect(() => {
        if (!selectedItem && items.length > 0) {
            setSelectedItem(items[0]);
        }
    }, [items, selectedItem]);

    const handleItemClick = (item: MediaItem) => {
        setSelectedItem(item);
        setViewingItem(item);
        if (!isInfoOpen && onToggleInfo) {
            onToggleInfo();
        }
    };

    const renderGridView = () => {
        if (viewMode === 'days') {
            return (
                <div className="gallery-masonry-grid">
                    {items.length > 0 && (
                        <>
                            <div
                                className={`grid-hero ${selectedItem?.id === items[0].id ? 'selected' : ''}`}
                                onClick={() => handleItemClick(items[0])}
                            >
                                <div className="hero-overlay">
                                    <h1>{items[0].date}</h1>
                                    <p>{items[0].location}</p>
                                </div>
                                <img src={items[0].url} alt="Hero" />
                            </div>
                            <div className="grid-secondary-group">
                                {items[1] && (
                                    <div
                                        className={`gallery-item large ${selectedItem?.id === items[1].id ? 'selected' : ''}`}
                                        onClick={() => handleItemClick(items[1])}
                                    >
                                        <div className="gallery-item-overlay">
                                            <div className="item-info">
                                                <span className="item-date">{items[1].date}</span>
                                                <span className="item-loc">{items[1].location}</span>
                                            </div>
                                            <button className="item-more"><MoreHorizontal size={14} /></button>
                                        </div>
                                        <img src={items[1].url} alt="Feature" />
                                    </div>
                                )}
                                <div className="nest">
                                    {items[2] && (
                                        <div
                                            className={`gallery-item small ${selectedItem?.id === items[2].id ? 'selected' : ''}`}
                                            onClick={() => handleItemClick(items[2])}
                                        >
                                            <div className="gallery-item-overlay">
                                                <div className="item-info">
                                                    <span className="item-date">{items[2].date}</span>
                                                    <span className="item-loc">{items[2].location}</span>
                                                </div>
                                            </div>
                                            <img src={items[2].url} alt="Small" />
                                        </div>
                                    )}
                                    {items[3] && (
                                        <div
                                            className={`gallery-item small ${selectedItem?.id === items[3].id ? 'selected' : ''}`}
                                            onClick={() => handleItemClick(items[3])}
                                        >
                                            <div className="gallery-item-overlay">
                                                <div className="item-info">
                                                    <span className="item-date">{items[3].date}</span>
                                                    <span className="item-loc">{items[3].location}</span>
                                                </div>
                                            </div>
                                            <img src={items[3].url} alt="Small" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="wide-strip">
                                {items.slice(4).map((item) => (
                                    <div
                                        key={item.id}
                                        className={`gallery-item ${selectedItem?.id === item.id ? 'selected' : ''}`}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        <div className="gallery-item-overlay">
                                            <div className="item-info">
                                                <span className="item-date">{item.date}</span>
                                                <span className="item-loc">{item.location}</span>
                                            </div>
                                            <button className="item-more"><MoreHorizontal size={14} /></button>
                                        </div>
                                        <img src={item.url} alt="Gallery item" />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            );
        }

        // Years, Months, and All Photos view logic
        const gridClass = viewMode === 'years' ? 'years-grid' : (viewMode === 'months' ? 'months-grid' : 'all-photos-grid');

        return (
            <div className={`gallery-standard-grid ${gridClass}`}>
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`gallery-item compact ${selectedItem?.id === item.id ? 'selected' : ''}`}
                        onClick={() => handleItemClick(item)}
                    >
                        <img src={item.url} alt={item.title} />
                        {(viewMode === 'months' || viewMode === 'years') && (
                            <div className="compact-label">
                                {viewMode === 'years' ? item.date.split(' ').pop() : item.date}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="gallery-container">
            <aside className="gallery-sidebar">
                <div className="sidebar-group">
                    <div className="sidebar-label">Photos</div>
                    <button className={`sidebar-item ${selectedAlbum === 'Library' ? 'active' : ''}`} onClick={() => { setSelectedAlbum('Library'); setViewingItem(null); }}>
                        <Library size={18} className="icon-blue" />
                        <span>Library</span>
                    </button>
                    <button className="sidebar-item">
                        <Users size={18} className="icon-blue" />
                        <span>Shared with You</span>
                    </button>
                    <button className="sidebar-item">
                        <Clock size={18} className="icon-blue" />
                        <span>Memories</span>
                    </button>
                    <button className="sidebar-item">
                        <Users size={18} className="icon-blue" />
                        <span>People</span>
                    </button>
                    <button className="sidebar-item">
                        <MapPin size={18} className="icon-blue" />
                        <span>Places</span>
                    </button>
                    <button className="sidebar-item">
                        <Heart size={18} className="icon-blue" />
                        <span>Favorites</span>
                    </button>
                    <button className="sidebar-item">
                        <Clock size={18} className="icon-blue" />
                        <span>Recents</span>
                    </button>
                    <button className="sidebar-item">
                        <Download size={18} className="icon-blue" />
                        <span>Imports</span>
                    </button>
                </div>

                <div className="sidebar-group">
                    <div className="sidebar-label">Albums</div>
                    <div className="collapsible-item">
                        <ChevronRight size={14} className="chevron" />
                        <ImageIcon size={18} />
                        <span>Media Types</span>
                    </div>
                    <div className="collapsible-item">
                        <ChevronRight size={14} className="chevron" />
                        <ImageIcon size={18} />
                        <span>Shared Albums</span>
                    </div>
                    <div className="collapsible-item">
                        <ChevronRight size={14} className="chevron expanded" />
                        <ImageIcon size={18} />
                        <span>My Albums</span>
                    </div>
                    <div className="sidebar-sub-group">
                        {ALBUMS.map(album => (
                            <button
                                key={album.id}
                                className={`sidebar-item sub ${selectedAlbum === album.id ? 'active' : ''}`}
                                onClick={() => { setSelectedAlbum(album.id); setViewingItem(null); }}
                            >
                                {album.icon}
                                <span>{album.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="sidebar-group">
                    <div className="sidebar-label">Projects</div>
                    <div className="collapsible-item">
                        <ChevronRight size={14} className="chevron" />
                        <ImageIcon size={18} />
                        <span>My Projects</span>
                    </div>
                </div>
            </aside>

            <main className={`gallery-main ${viewingItem ? 'dimmed' : ''}`}>
                <div className="gallery-content-scroller">
                    {items.length > 0 ? renderGridView() : (
                        <div className="empty-state">
                            <ImageIcon size={48} color="#8e8e93" />
                            <p>No items in this album yet.</p>
                        </div>
                    )}
                </div>

                {viewingItem && (
                    <div className="single-photo-view" onClick={() => setViewingItem(null)}>
                        <button className="done-button" onClick={(e) => { e.stopPropagation(); setViewingItem(null); }}>
                            <ChevronLeft size={18} /> <span>Done</span>
                        </button>
                        <div className="photo-centerpiece">
                            <img
                                src={viewingItem.url}
                                alt={viewingItem.title}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>
                )}
            </main>

            {isInfoOpen && selectedItem && (
                <aside className="gallery-info-sidebar">
                    <div className="info-header">
                        <div className="info-thumbnail">
                            <img
                                src={selectedItem.url}
                                alt="Thumbnail"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div className="info-summary">
                            <h4>{selectedItem.title}.jpg</h4>
                            <p>JPEG image - {selectedItem.size}</p>
                        </div>
                    </div>

                    <div className="info-grid">
                        <div className="info-label">Created</div>
                        <div className="info-value">Today, 10:44 AM</div>

                        <div className="info-label">Modified</div>
                        <div className="info-value">{selectedItem.date}, 03:20 PM</div>

                        <div className="info-label">Content created</div>
                        <div className="info-value">{selectedItem.date}</div>

                        <div className="info-separator" />

                        <div className="info-label">Dimensions</div>
                        <div className="info-value">{selectedItem.dimensions}</div>

                        <div className="info-label">Color profile</div>
                        <div className="info-value">Display P3</div>

                        <div className="info-separator" />

                        <div className="info-label">Device make</div>
                        <div className="info-value">Apple</div>

                        <div className="info-label">Device model</div>
                        <div className="info-value">MacBook Pro</div>
                    </div>

                    <div className="info-section-title">Description</div>
                    <p className="description-text">{selectedItem.description}</p>

                    <div className="info-section-title">Location</div>
                    <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={14} color="#007AFF" /> {selectedItem.location}
                    </div>
                </aside>
            )}
        </div>
    );
};

export default Gallery;
