import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './CoursesSearch.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import CoursesList from '../CoursesList/CoursesList';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import coursesApi from '~/api/coursesApi';
import { useDebounce } from '~/hooks';
import ChosenCourseList from '../ChosenCourseList';

const cx = classNames.bind(styles);

function CoursesSearch() {
    // const [inputText, setInputText] = useState('');
    const [allCourses, setAllCourses] = useState([]);
    const [chosenCourses, setChosenCourses] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [dropDown, setDropDown] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    // let favorCourses = [];

    useEffect(() => {
        const fetchCourses = async () => {
            const coursesList = await coursesApi.getAll();
            setAllCourses(coursesList);
            setSearchResult(coursesList);
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult(allCourses);
            return;
        }
        const resultsArray = allCourses.filter(
            (post) =>
                post.title.includes(debouncedValue.toLowerCase()) || post.body.includes(debouncedValue.toLowerCase()),
        );

        setSearchResult(resultsArray);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    const handleClick = async (index) => {
        const chosenCourse = await coursesApi.get(index);
        setSearchValue('');
        setDropDown(false);
        setChosenCourses((chosenCourses) => [chosenCourse, ...chosenCourses]);
    };

    const handleDropDownClick = () => {
        setDropDown(!dropDown);
    };

    const handleHideResult = () => {
        setDropDown(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(e.target.value);
        }
    };

    const handleDeleteCourse = (index) => {
        const newArr = chosenCourses.filter((item, id) => id !== index);
        setChosenCourses(newArr);
    };

    return (
        // Fix tippyjs error by adding a wrapper <div> or <span>
        <div>
            <div>
                <HeadlessTippy
                    interactive
                    visible={dropDown}
                    placement={'bottom-start'}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper className={cx('popper-result')}>
                                <CoursesList
                                    className={cx('coursesListDropDown')}
                                    courses={searchResult}
                                    onChose={handleClick}
                                />
                            </PopperWrapper>
                        </div>
                    )}
                    onClickOutside={handleHideResult}
                >
                    <div className={cx('wrapper')}>
                        <label>You want to study...</label>
                        <div className={cx('searchDiv')}>
                            <FontAwesomeIcon className={cx('searchIcon')} icon={faMagnifyingGlass} />
                            <input
                                ref={inputRef}
                                value={searchValue}
                                className={cx('searchInput')}
                                type="text"
                                placeholder="Search..."
                                onChange={handleChange}
                                onFocus={() => setDropDown(true)}
                            ></input>
                            <button className={cx('dropDownButton')} onClick={handleDropDownClick}>
                                <Image className={cx('dropDownImg')} src={images.dropDownIcon}></Image>
                            </button>
                        </div>
                    </div>
                </HeadlessTippy>
            </div>
            <ChosenCourseList courses={chosenCourses} onChose={handleDeleteCourse} />
        </div>
    );
}

export default CoursesSearch;
