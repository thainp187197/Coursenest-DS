import { React } from 'react';
import classNames from 'classnames/bind';

import styles from './ChosenCourseList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ChosenCourseList({ courses, onChose }) {
    const handleDelete = (index) => {
        onChose(index);
    };

    return (
        <ul className={cx('course-list')}>
            {courses.map((item, index) => (
                <li className={cx('course-item')} key={index}>
                    {item.title}
                    <button className={cx('deleteCourseButton')} onClick={() => handleDelete(index)}>
                        <FontAwesomeIcon className={cx('deleteCourse')} icon={faMinus} />
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default ChosenCourseList;
